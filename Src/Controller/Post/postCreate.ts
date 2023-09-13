import {Request, Response} from "express";
import {postSchema} from "../../SchemaValidation/SchemaValidation";
import {PostSchema} from "../../Types/Types";
import {Model, UniqueConstraintError, ValidationError} from "sequelize";
import {Post} from "../../models/post";


export async function createPost(req: Request, res: Response):Promise<void> {
    try {
        const body: PostSchema = req.body

        const imagePath :string = req.file ? req.file.path : null;

        await postSchema.validate({...body,imagePath:imagePath});



        const newPost: Model<PostSchema> = await Post.create({
            title: body.title,
            body: body.body,
            name: body.name,
            topic: body.topic,
            userId: body.userId,
            imagePath:imagePath,
            categoryId:body.categoryId,

        });
        await newPost.save()
        res.status(200).send(newPost.toJSON());
    } catch (error) {
        console.log(error)
            res.status(400).json(error);

    }
}