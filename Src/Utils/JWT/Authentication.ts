import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: Function) {
  const token: string = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err: jwt.VerifyErrors, user: string) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid" });
      }
      req["user"] = user;
      next();
    }
  );
}

export default authenticateToken;
