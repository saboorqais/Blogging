import {Request, Response} from "express";
import {Post} from "../../models/post";
import {User} from "../../models/user";
import paginate from "express-paginate";

export async function getPost(req: Request, res: Response): Promise<void> {
    try {
        const {id} = req.params
        const posts: Post[] = await Post.findAll({
            where: {
                userId: id,
            },
            include: {
                model :User,
                attributes: {
                    exclude: ['password'], // Replace with field names to omit
                }

            }

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
        const offset :number = req.skip; // Access the offset calculated by express-paginate
        const limit :number= parseInt(req.query.limit as string);
        const posts: Post[] = await Post.findAll({
            offset,
            limit,
            include: {
                model :User,
                attributes: {
                    exclude: ['password'], // Replace with field names to omit
                }

            }
        });
        const itemCount = posts.length;
        const pageCount = Math.ceil(itemCount / parseInt(req.query.limit as string));
        // Handle the retrieved data (posts)
        res.status(200).send({
            results: posts,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(1, pageCount, parseInt(req.query.page as string))
        });
    } catch (error) {
        // Handle any errors

        res.status(500).send(error);
    }
}