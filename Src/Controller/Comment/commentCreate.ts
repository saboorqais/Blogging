import { Request, Response } from "express";
import { CommentSchema } from "../../Types/Types";
import { commentSchema } from "../../SchemaValidation/SchemaValidation";
import { Comment } from "../../models/comments";
import { Model } from "sequelize";

export async function createComment(req: Request, res: Response): Promise<void> {
  try {
    const body: CommentSchema = req.body;
    console.log("SAdddd")
    console.log(body)
    await commentSchema.validate(req.body);
    const newPost: Model<CommentSchema> = await Comment.create({
      text: body.text,
      postId: body.postId,
      parentId: body.parentId,
      userId: body.userId,
    });
    await newPost.save();
    res.status(200).send(newPost.toJSON());
  } catch (error) {
    res.status(400).json(error);
  }
}
