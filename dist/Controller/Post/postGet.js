"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPost = exports.getPost = void 0;
const post_1 = require("../../models/post");
const user_1 = require("../../models/user");
const express_paginate_1 = __importDefault(require("express-paginate"));
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const posts = yield post_1.Post.findAll({
                where: {
                    userId: id,
                },
                include: {
                    model: user_1.User,
                    attributes: {
                        exclude: ['password'], // Replace with field names to omit
                    }
                }
            });
            // Handle the retrieved data (posts)
            res.status(200).send(posts);
        }
        catch (error) {
            // Handle any errors
            res.status(500).send(error);
        }
    });
}
exports.getPost = getPost;
function getAllPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offset = req.skip; // Access the offset calculated by express-paginate
            const limit = parseInt(req.query.limit);
            const posts = yield post_1.Post.findAll({
                offset,
                limit,
                include: {
                    model: user_1.User,
                    attributes: {
                        exclude: ['password'], // Replace with field names to omit
                    }
                }
            });
            const itemCount = posts.length;
            const pageCount = Math.ceil(itemCount / parseInt(req.query.limit));
            // Handle the retrieved data (posts)
            res.status(200).send({
                results: posts,
                pageCount,
                itemCount,
                pages: express_paginate_1.default.getArrayPages(req)(1, pageCount, parseInt(req.query.page))
            });
        }
        catch (error) {
            // Handle any errors
            res.status(500).send(error);
        }
    });
}
exports.getAllPost = getAllPost;