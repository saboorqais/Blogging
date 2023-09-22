import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const refresh = async (req: Request, res: Response): Promise<Response> => {
  const refreshToken: string = req.headers["authorization"] as string;
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded: string | jwt.JwtPayload = jwt.verify(refreshToken, process.env.SECRET_KEY);
    const accessToken: string = jwt.sign({ user: decoded }, process.env.SECRET_KEY, { expiresIn: "3h" });

    res.header("Authorization", accessToken).send(decoded);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
export default refresh;
