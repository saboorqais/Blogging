import {Router} from "express";
import {createComment} from "../Controller/Comment/commentCreate";
import {getComment} from "../Controller/Comment/commentGet";

const commentRouter: Router = Router();

commentRouter.post('/', createComment)

commentRouter.get('/:id', getComment)

export default commentRouter;