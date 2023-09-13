import {Router} from "express";
import {createPost} from "../Controller/Post/postCreate";
import {getAllPost, getPost} from "../Controller/Post/postGet";
import uploadImage from "../Utils/multerInstance/multerInstance";

const postRouter: Router = Router();

postRouter.post('/', uploadImage('posts'),createPost)
postRouter.get('/:id', getPost)
postRouter.get('/', getAllPost)


export default postRouter;