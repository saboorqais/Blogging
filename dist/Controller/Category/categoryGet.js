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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryWithRelatedPosts = exports.selectionCategory = exports.getCategory = void 0;
const categories_1 = require("../../models/categories");
const post_1 = require("../../models/post");
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = req.params.id;
            const category = yield categories_1.Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            // Get the server's address (hostname and port)
            const serverAddress = req.protocol + "://" + req.get("host");
            // Construct the response object with the complete image URL and other data
            const responseData = {
                image: `${serverAddress}/${category.imagePath}`,
                categoryData: category.toJSON(), // Assuming you want to send all category data
                // Add additional data as needed
            };
            res.status(200).json(responseData);
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
            res.status(500).json({ error: "Internal server error" });
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
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getCategoryWithRelatedPosts = getCategoryWithRelatedPosts;
