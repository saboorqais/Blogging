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
exports.getComment = void 0;
const comments_1 = require("../../models/comments");
function getComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield comments_1.Comment.findAll({
                where: {
                    postId: req.params.id,
                },
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
exports.getComment = getComment;
