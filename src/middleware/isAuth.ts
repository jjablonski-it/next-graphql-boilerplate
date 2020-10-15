import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import ContextType from "../types/ContextType";
import TokenPayload from "../types/TokenPayload";

const isAuth: MiddlewareFn<ContextType> = ({ context }, next) => {
  console.log("auth start");

  const authorization = context.req.headers["authorization"];

  if (!authorization) throw Error("auth header not provided");

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.AUTH_SECRET!) as TokenPayload;
    context.payload = payload;
  } catch (error) {
    throw Error("incorrect auth token");
  }
  console.log("auth end");

  return next();
};

export default isAuth;
