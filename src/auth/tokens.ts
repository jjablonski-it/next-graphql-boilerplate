import User from "../entities/User";
import { sign } from "jsonwebtoken";
import TokenPayload from "../types/TokenPayload";

export const createAuthToken = (user: User) =>
  sign({ userId: user.id }, process.env.AUTH_SECRET!, { expiresIn: "30sec" });

export const createRefreshToken = (user: User) =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion } as TokenPayload,
    process.env.REFRESH_SECRET!,
    { expiresIn: "7d" }
  );
