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
exports.deletePostById = void 0;
const post_1 = require("../../models/post");
const promises_1 = __importDefault(require("fs/promises"));
function deletePostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { postId } = req.params;
            const data = yield post_1.Post.findByPk(postId);
            if (!data) {
                res.status(400).send({ message: "Post not found." });
            }
            yield promises_1.default.unlink(data.imagePath);
            // Delete the image record from the database
            const deletedRowCount = yield post_1.Post.destroy({
                where: {
                    id: postId,
                },
            });
            if (deletedRowCount === 0) {
                res.status(300).send({ message: "No Matching Rows Found" });
            }
            else {
                res.status(200).send({ message: "Post Deleted successfully", RowCount: deletedRowCount });
            }
        }
        catch (error) {
            res.status(400).send({ error: error });
        }
    });
}
exports.deletePostById = deletePostById;
