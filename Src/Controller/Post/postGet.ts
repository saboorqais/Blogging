import { Request, Response } from "express";
import { Post } from "../../models/post";
import { User } from "../../models/user";
import paginate from "express-paginate";

export async function getUserPost(req: Request, res: Response): Promise<void> {
    try {
        const { page, limit } = req.query;
        const { userId } = req.params;

        const user :User = await User.findByPk(userId)
      
        const { count, rows } = await Post.findAndCountAll({
              offset: (parseInt(page as string) - 1) * parseInt(limit as string),
              limit: parseInt(limit as string),
              where: user.role === "user"?{
                userId: userId,
            }:{},
              include: {
                  model: User,
                  attributes: {
                      exclude: ["password"], // Replace with field names to omit
                  },
              },
        });
        // Handle the retrieved data (posts)
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
        res.status(400).send(error);
    }
}
export async function getPost(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        const posts: Post = await Post.findOne({
            where: {
                id: id,
            },
        });
        // Handle the retrieved data (posts)
        res.status(200).send(posts);
    } catch (error) {
        // Handle any errors

        res.status(500).send(error);
    }
}

export async function getAllPost(req: Request, res: Response): Promise<void> {
    try {
        const offset: number = req.skip; // Access the offset calculated by express-paginate
        const limit: number = parseInt(req.query.limit as string);
        const posts: Post[] = await Post.findAll({
            offset,
            limit,
            include: {
                model: User,
                attributes: {
                    exclude: ["password"], // Replace with field names to omit
                },
            },
        });
        const itemCount = posts.length;
        const pageCount = Math.ceil(itemCount / parseInt(req.query.limit as string));
        // Handle the retrieved data (posts)
        res.status(200).send({
            results: posts,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(1, pageCount, parseInt(req.query.page as string)),
        });
    } catch (error) {
        // Handle any errors

        res.status(500).send(error);
    }
}
