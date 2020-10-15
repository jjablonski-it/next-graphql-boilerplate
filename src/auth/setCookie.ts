import { Response } from "express";

/**
 * Sets refresh token cookie that will be send to the client
 * @param res Express response object
 * @param token Auth token provided
 */
const setCookie = (res: Response, token: string) => {
  res.cookie("rid", token, {
    httpOnly: true,
    path: "/refresh_token",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export default setCookie;
