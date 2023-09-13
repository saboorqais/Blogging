import * as Yup from 'yup'
import {CommentSchema, PostSchema, UserSchema} from "../Types/Types";

export const userSchema:Yup.ObjectSchema<UserSchema> = Yup.object().shape({
    id:Yup.number(),
    firstName: Yup.string().required()  ,
    lastName: Yup.string(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
});

export const postSchema:Yup.ObjectSchema<PostSchema> = Yup.object().shape({
    id:Yup.number(),
    title: Yup.string().max(15).required()  ,
    body: Yup.string().required(),
    name: Yup.string().required(),
    topic: Yup.string().required(),
    userId:Yup.number().required(),
    categoryId:Yup.number().required(),
    imagePath:Yup.string().required()
});
export const commentSchema:Yup.ObjectSchema<CommentSchema> = Yup.object().shape({
    id:Yup.number(),
    text:  Yup.string().max(60).required(),
    userId:  Yup.number().required() ,
    parentId:  Yup.number().nullable() ,
    postId:  Yup.number().required()
});

