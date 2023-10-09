"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postCreate_1 = require("../Controller/Post/postCreate");
const postGet_1 = require("../Controller/Post/postGet");
const multerInstance_1 = __importDefault(require("../Utils/multerInstance/multerInstance"));
const postDelete_1 = require("../Controller/Post/postDelete");
const postEdit_1 = require("../Controller/Post/postEdit");
const postSearch_1 = require("../Controller/Post/postSearch");
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
const postRouter = (0, express_1.Router)();
postRouter.post("/", (0, multerInstance_1.default)("posts"), postCreate_1.createPost);
postRouter.get("/search", postSearch_1.postSearch);
postRouter.delete("/:postId", postDelete_1.deletePostById);
postRouter.put("/:postId", (0, multerInstance_1.default)("posts"), postEdit_1.editPost);
postRouter.get("/userId/:userId", postGet_1.getUserPost);
postRouter.get("/:id", postGet_1.getPost);
postRouter.get("/", postGet_1.getAllPost);
exports.default = postRouter;
