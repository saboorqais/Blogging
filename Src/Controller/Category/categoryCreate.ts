import {Request, Response} from "express";
import {Category} from "../../models/categories";


export async function createCategory(req: Request, res: Response):Promise<void> {
    try {
        const { categoryName, description } = req.body;
        // Use the upload middleware to handle the file upload
            // Handle the uploaded file (req.file) here
            // You can access the file details like req.file.filename, req.file.path, etc.
            const imagePath :string = req.file ? req.file.path : null;
            // Create a new category record in the database
            const category  :Category = await Category.create({
                categoryName,
                description,
                imagePath,
            });
            await category.save()
            res.status(201).json(category);

    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Category creation failed' });
    }

}