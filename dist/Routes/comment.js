"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentCreate_1 = require("../Controller/Comment/commentCreate");
const commentGet_1 = require("../Controller/Comment/commentGet");
const commentRouter = (0, express_1.Router)();
commentRouter.post("/", commentCreate_1.createComment);
commentRouter.get("/paginate/", commentGet_1.getPaginateComment);
commentRouter.get("/:id", commentGet_1.getComment);
commentRouter.get("/posts/:postId/:parentId", commentGet_1.getPaginateComment);
commentRouter.get("/post/:postId/:parentId", commentGet_1.getNLevelComment);
commentRouter.get("/post/:id", commentGet_1.getNLevelComment);
exports.default = commentRouter;
