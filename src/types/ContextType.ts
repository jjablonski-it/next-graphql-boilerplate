import { Request, Response } from "express";
import RefreshTokenPayload from "./TokenPayload";

type ContextType = {
  req: Request;
  res: Response;
  payload?: RefreshTokenPayload;
};

export default ContextType;
