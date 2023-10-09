import { Request, Response } from "express";
import { CategoriesSchema, PostSchema } from "../../Types/Types";
import { Post } from "../../models/post";
import fs from "fs/promises";
import { Category } from "../../models/categories";
export async function editCategory(req: Request, res: Response): Promise<void> {
    try {
        const body: CategoriesSchema = req.body;

        const { categoryId } = req.params;

        const imagePath: string = req.file ? req.file.path : null;
        // Find the post you want to update by its primary key (postId)
        const category = await Category.findByPk(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        await fs.unlink(category.imagePath);

        // Update the post's attributes with the new values
        await category.update({ ...body, imagePath: imagePath });

        res.status(200).send(category.toJSON());
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
