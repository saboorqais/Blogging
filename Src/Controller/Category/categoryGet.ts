import { Response, Request } from "express";
import { Comment } from "../../models/comments";
import { Category } from "../../models/categories";
import { Post } from "../../models/post";
import Posts from "../../Routes/posts";
import { PostSchema } from "../../Types/Types";

export async function getCategory(req: Request, res: Response) {
  try {
    const categoryId: string = req.params.id;
    const category: Category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Get the server's address (hostname and port)
    const serverAddress: string = req.protocol + "://" + req.get("host");

    // Construct the response object with the complete image URL and other data
    const responseData = {
      image: `${serverAddress}/${category.imagePath}`,
      categoryData: category.toJSON(), // Assuming you want to send all category data
      // Add additional data as needed
    };

    res.status(200).json(responseData);
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
    res.status(500).json({ error: "Internal server error" });
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
    return res.status(500).json({ message: "Internal server error" });
  }
}
