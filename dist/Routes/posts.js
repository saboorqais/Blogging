"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postCreate_1 = require("../Controller/Post/postCreate");
const postGet_1 = require("../Controller/Post/postGet");
const multerInstance_1 = __importDefault(require("../Utils/multerInstance/multerInstance"));
const postRouter = (0, express_1.Router)();
postRouter.post("/", (0, multerInstance_1.default)("posts"), postCreate_1.createPost);
postRouter.get("/userId/:id", postGet_1.getUserPost);
postRouter.get("/:id", postGet_1.getPost);
postRouter.get("/", postGet_1.getAllPost);
exports.default = postRouter;
