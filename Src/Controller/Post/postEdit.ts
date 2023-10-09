import { Request, Response } from "express";
import { postSchema } from "../../SchemaValidation/SchemaValidation";
import { PostSchema } from "../../Types/Types";
import { Model } from "sequelize";
import { Post } from "../../models/post";
import modifyBody from "../../Utils/BodyModify/body";
import fs from "fs/promises";
export async function editPost(req: Request, res: Response): Promise<void> {
    try {
        const body: PostSchema = req.body;

        const { postId } = req.params;

        const imagePath: string = req.file ? req.file.path : null;
        console.log("aSDddddddddddddd");
        console.log(imagePath);

        // Find the post you want to update by its primary key (postId)
        const post = await Post.findByPk(postId);
        console.log(post);
        if (!post) {
            throw new Error("Post not found");
        }
        await fs.unlink(post.imagePath);

        // Update the post's attributes with the new values
        await post.update({ ...body, imagePath: imagePath });

        res.status(200).send(post.toJSON());
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
