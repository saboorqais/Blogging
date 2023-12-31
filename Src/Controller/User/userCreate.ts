import { Request, Response } from "express";
import { User } from "../../models/user";
import { userSchema } from "../../SchemaValidation/SchemaValidation";
import { UserSchema } from "../../Types/Types";
import { Model, UniqueConstraintError, ValidationError } from "sequelize";

export async function createUser(req: Request, res: Response) {
    try {
        const body: UserSchema = req.body;

        await userSchema.validate({ ...req.body, role: "user" });
        const newUser: Model<UserSchema> = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            role: body.role,
        });
        await newUser.save();
        res.status(200).send({ response: newUser.toJSON() });
    } catch (error) {
        console.log(error);
        if (error instanceof UniqueConstraintError) {
            // Handle unique constraint violation (e.g., duplicate email)
            res.status(400).json({ message:"User with this email already exists"});
        } else if (error instanceof ValidationError) {
            // Handle other validation errors
            const validationErrors = error.errors.map((e) => e.message);
            res.status(400).json({ message: validationErrors });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
}
