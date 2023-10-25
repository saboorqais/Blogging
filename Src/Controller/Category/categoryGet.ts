import { Response, Request } from "express";
import { Category } from "../../models/categories";
import { Post } from "../../models/post";
import paginate from "express-paginate";
export async function getCategory(req: Request, res: Response) {
    try {
        const categoryId: string = req.params.id;
        const category: Category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        // Get the server's address (hostname and port)

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function selectionCategory(req: Request, res: Response) {
    try {
        const category: Category[] = await Category.findAll({
            attributes: { exclude: ["imagePath"] },
        });
        // Construct the response object with the complete image URL and other data
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getCategoryWithRelatedPosts(req: Request, res: Response) {
    try {
        const categories: Category[] = await Category.findAll();

        if (!categories) {
            return res.status(404).json({ message: "Category not found" });
        }
        const results = await Promise.all(
            categories.map(async (category: Category) => {
                // Perform some asynchronous operation on 'item'
                const posts: Post[] = await Post.findAll({
                    where: { categoryId: category.id },
                });
                return {
                    category,
                    posts,
                };
            })
        );

        // Find all posts associated with the category
        return res.json(results);
    } catch (error) {
        return res.status(500).json({ message: error});
    }
}
export async function getAllCategory(req: Request, res: Response) {
    try {
        const { page, limit } = req.query;
        const { rows, count } = await Category.findAndCountAll({
            offset: (parseInt(page as string) - 1) * parseInt(limit as string),
            limit: parseInt(limit as string),
        });
        // Construct the response object with the complete image URL and other data
        const pageCount = Math.ceil(count / parseInt(limit as string));
        const pagination = {
            currentPage: parseInt(page as string),
            pageCount,
            pageSize: parseInt(limit as string),
            totalCount: count,
        };
        // Generate the URL of the next page if it exists
        const nextPage =
            pageCount > parseInt(page as string)
                ? paginate.getArrayPages(req)(parseInt(page as string) + 1, pageCount, parseInt(page as string))
                : null;

        const response = {
            results: rows,
            pagination,
            nextPage,
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ message:error});
    }
}
