import express from "express";
import { verify } from "jsonwebtoken";
import User from "../entities/User";
import LoginResponse from "../types/LoginResponse";
import TokenPayload from "../types/TokenPayload";
import setCookie from "./setCookie";
import { createAuthToken, createRefreshToken } from "./tokens";

const refreshTokenRoute = express.Router();

refreshTokenRoute.get("/", async (req, res) => {
  const token = req.cookies.rid;
  if (!token)
    return res.send({
      error: { message: "token not provided" },
    } as LoginResponse);

  let payload: TokenPayload | null = null;

  try {
    payload = verify(token, process.env.REFRESH_SECRET!) as TokenPayload;
  } catch (e) {
    return res.send({
      error: { message: "incorrect token" },
    } as LoginResponse);
  }

  const user = await User.findOne(payload.userId);
  if (!user)
    return res.send({
      error: { message: "user does not exist" },
    } as LoginResponse);

  if (user.tokenVersion > payload.tokenVersion!) {
    return res.send({
      error: { message: "revoked token" },
    } as LoginResponse);
  }

  setCookie(res, createRefreshToken(user));

  return res.send({ authToken: createAuthToken(user) } as LoginResponse);
});

export default refreshTokenRoute;
