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
exports.createCategory = void 0;
const categories_1 = require("../../models/categories");
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryName, description } = req.body;
            // Use the upload middleware to handle the file upload
            // Handle the uploaded file (req.file) here
            // You can access the file details like req.file.filename, req.file.path, etc.
            const imagePath = req.file ? req.file.path : null;
            // Create a new category record in the database
            const category = yield categories_1.Category.create({
                categoryName,
                description,
                imagePath,
            });
            yield category.save();
            res.status(200).json(category);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    });
}
exports.createCategory = createCategory;
