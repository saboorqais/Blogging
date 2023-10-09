import { Request, Response } from "express";
import { Post } from "../../models/post";
import fs from 'fs/promises'
export async function deletePostById(req: Request, res: Response): Promise<void> {
    try {
        const { postId } = req.params;

        const data = await Post.findByPk(postId);
        if (!data) {
            res.status(400).send({ message: "Post not found." });
        }
        await fs.unlink(data.imagePath);

        // Delete the image record from the database

        const deletedRowCount = await Post.destroy({
            where: {
                id: postId,
            },
        });

        if (deletedRowCount === 0) {
            res.status(300).send({ message: "No Matching Rows Found" });
        } else {
            res.status(200).send({ message: "Post Deleted successfully", RowCount: deletedRowCount });
        }
    } catch (error) {
        res.status(400).send({ error: error });
    }
}
