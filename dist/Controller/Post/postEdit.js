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
exports.editPost = void 0;
const post_1 = require("../../models/post");
const promises_1 = __importDefault(require("fs/promises"));
function editPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const { postId } = req.params;
            const imagePath = req.file ? req.file.path : null;
            // Find the post you want to update by its primary key (postId)
            const post = yield post_1.Post.findByPk(postId);
            console.log(post);
            if (!post) {
                res.status(404).send({ message: "Post not Found" });
            }
            yield promises_1.default.unlink(post.imagePath);
            // Update the post's attributes with the new values
            yield post.update(Object.assign(Object.assign({}, body), { imagePath: imagePath }));
            res.status(200).send(post.toJSON());
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    });
}
exports.editPost = editPost;
