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
exports.editCategory = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const categories_1 = require("../../models/categories");
function editCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const { categoryId } = req.params;
            const imagePath = req.file ? req.file.path : null;
            // Find the post you want to update by its primary key (postId)
            const category = yield categories_1.Category.findByPk(categoryId);
            if (!category) {
                throw new Error("Category not found");
            }
            yield promises_1.default.unlink(category.imagePath);
            // Update the post's attributes with the new values
            yield category.update(Object.assign(Object.assign({}, body), { imagePath: imagePath }));
            res.status(200).send(category.toJSON());
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    });
}
exports.editCategory = editCategory;
