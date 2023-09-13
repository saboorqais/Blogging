import {Response,Request} from "express";
import {Comment} from '../../models/comments'
export async function getComment(req:Request,res:Response):Promise<void> {
    try {

        const posts:Comment[] = await Comment.findAll({
            where: {
                postId: req.params.id,
            },
        });
        // Handle the retrieved data (posts)
        res.status(200).send( posts);
    } catch (error) {
        // Handle any errors

        res.status(500).send( error);
    }
}