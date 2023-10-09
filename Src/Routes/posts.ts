import { Router } from "express";
import { createPost } from "../Controller/Post/postCreate";
import { getAllPost, getPost, getUserPost } from "../Controller/Post/postGet";
import uploadImage from "../Utils/multerInstance/multerInstance";
import { deletePostById } from "../Controller/Post/postDelete";
import { editPost } from "../Controller/Post/postEdit";
import { postSearch } from "../Controller/Post/postSearch";
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         name:
 *           type: string
 *         topic:
 *           type: string
 *         userId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *         imagePath:
 *           type: string
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post created successfully
 *       400 :
 *         description : Post not Created
 */
const postRouter: Router = Router();

postRouter.post("/", uploadImage("posts"), createPost);
postRouter.get("/search",postSearch)
postRouter.delete("/:postId", deletePostById);
postRouter.put("/:postId", uploadImage("posts"), editPost);
postRouter.get("/userId/:userId", getUserPost);
postRouter.get("/:id", getPost);
postRouter.get("/", getAllPost);

export default postRouter;
