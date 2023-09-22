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
exports.createComment = void 0;
const SchemaValidation_1 = require("../../SchemaValidation/SchemaValidation");
const comments_1 = require("../../models/comments");
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            console.log("SAdddd");
            console.log(body);
            yield SchemaValidation_1.commentSchema.validate(req.body);
            const newPost = yield comments_1.Comment.create({
                text: body.text,
                postId: body.postId,
                parentId: body.parentId,
                userId: body.userId,
            });
            yield newPost.save();
            res.status(200).send(newPost.toJSON());
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
exports.createComment = createComment;
