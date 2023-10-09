import * as Yup from "yup";
import { CommentSchema, PostSchema, UserSchema } from "../Types/Types";

const Role = {
    Admin: "admin",
    User: "user",
};
export const userSchema: Yup.ObjectSchema<UserSchema> = Yup.object().shape({
    id: Yup.number(),
    firstName: Yup.string().required(),
    lastName: Yup.string(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    role: Yup.string().oneOf(Object.values(Role), "Invalid Role Selection").required("Role is required"),
});

export const postSchema: Yup.ObjectSchema<PostSchema> = Yup.object().shape({
    id: Yup.number(),
    title: Yup.string().max(15).required(),
    body: Yup.string().required(),
    name: Yup.string().required(),
    topic: Yup.string().required(),
    userId: Yup.number().required(),
    categoryId: Yup.number().required(),
    imagePath: Yup.string().required(),
});

export const commentSchema: Yup.ObjectSchema<CommentSchema> = Yup.object().shape({
    id: Yup.number(),
    text: Yup.string().max(60).required(),
    userId: Yup.number().required(),
    parentId: Yup.number().nullable(),
    postId: Yup.number().required(),
    replies: Yup.array().optional(),
});
