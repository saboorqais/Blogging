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
exports.getAllCategory = exports.getCategoryWithRelatedPosts = exports.selectionCategory = exports.getCategory = void 0;
const categories_1 = require("../../models/categories");
const post_1 = require("../../models/post");
const express_paginate_1 = __importDefault(require("express-paginate"));
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = req.params.id;
            const category = yield categories_1.Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            // Get the server's address (hostname and port)
            res.status(200).json(category);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.getCategory = getCategory;
function selectionCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield categories_1.Category.findAll({
                attributes: { exclude: ["imagePath"] },
            });
            // Construct the response object with the complete image URL and other data
            res.status(200).json(category);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.selectionCategory = selectionCategory;
function getCategoryWithRelatedPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield categories_1.Category.findAll();
            if (!categories) {
                return res.status(404).json({ message: "Category not found" });
            }
            const results = yield Promise.all(categories.map((category) => __awaiter(this, void 0, void 0, function* () {
                // Perform some asynchronous operation on 'item'
                const posts = yield post_1.Post.findAll({
                    where: { categoryId: category.id },
                });
                return {
                    category,
                    posts,
                };
            })));
            // Find all posts associated with the category
            return res.json(results);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.getCategoryWithRelatedPosts = getCategoryWithRelatedPosts;
function getAllCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page, limit } = req.query;
            const { rows, count } = yield categories_1.Category.findAndCountAll({
                offset: (parseInt(page) - 1) * parseInt(limit),
                limit: parseInt(limit),
            });
            // Construct the response object with the complete image URL and other data
            const pageCount = Math.ceil(count / parseInt(limit));
            const pagination = {
                currentPage: parseInt(page),
                pageCount,
                pageSize: parseInt(limit),
                totalCount: count,
            };
            // Generate the URL of the next page if it exists
            const nextPage = pageCount > parseInt(page)
                ? express_paginate_1.default.getArrayPages(req)(parseInt(page) + 1, pageCount, parseInt(page))
                : null;
            const response = {
                results: rows,
                pagination,
                nextPage,
            };
            res.status(200).send(response);
        }
        catch (error) {
            res.status(400).send({ message: error });
        }
    });
}
exports.getAllCategory = getAllCategory;
