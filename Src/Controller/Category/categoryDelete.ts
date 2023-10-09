import { Request, Response } from "express";
import { Post } from "../../models/post";
import fs from "fs/promises";
import { Category } from "../../models/categories";

export async function deleteCategoryById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        const data = await Category.findByPk(id);
        if (!data) {
            res.status(400).send({ message: "Category not found." });
        }

        const postExist = await Post.findOne({
            where: {
                categoryId: id,
            },
        });

        if (postExist) {
            res.status(400).send({ message: "Category Associated with Posts" });
        } else {
            await fs.unlink(data.imagePath);

            const deletedRowCount = await Category.destroy({
                where: {
                    id: id,
                },
            });

            if (deletedRowCount === 0) {
                res.status(300).send({ message: "No Matching Rows Found" });
            } else {
                res.status(200).send({ message: "Category Deleted successfully", RowCount: deletedRowCount });
            }
        }

        // Delete the image record from the database
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error });
    }
}
