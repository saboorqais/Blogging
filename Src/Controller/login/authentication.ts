import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user: User = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json("Invalid email or password");
    }
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch: boolean = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json("Invalid email or password");
    }

    // Create a JWT token
    const token: string = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    const refreshToken: string = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role:user.role
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    // Return the token
    res.json({
      token,
      refreshToken,
      userId: user.id,
      firstName: user.firstName,
      role:user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
export default login;
