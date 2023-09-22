import { Router } from "express";
import { createComment } from "../Controller/Comment/commentCreate";
import { getComment, getNLevelComments, getNLevelComment, getPaginateComment } from "../Controller/Comment/commentGet";

const commentRouter: Router = Router();

commentRouter.post("/", createComment);
commentRouter.get("/paginate/", getPaginateComment);
commentRouter.get("/:id", getComment);

commentRouter.get("/posts/:postId/:parentId", getPaginateComment);

commentRouter.get("/post/:postId/:parentId", getNLevelComment);

commentRouter.get("/post/:id", getNLevelComment);

export default commentRouter;
