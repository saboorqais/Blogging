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
exports.createPost = void 0;
const SchemaValidation_1 = require("../../SchemaValidation/SchemaValidation");
const post_1 = require("../../models/post");
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const imagePath = req.file ? req.file.path : null;
            yield SchemaValidation_1.postSchema.validate(Object.assign(Object.assign({}, body), { imagePath: imagePath }));
            const newPost = yield post_1.Post.create({
                title: body.title,
                body: body.body,
                name: body.name,
                topic: body.topic,
                userId: body.userId,
                imagePath: imagePath,
                categoryId: body.categoryId,
            });
            yield newPost.save();
            res.status(200).send(newPost.toJSON());
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    });
}
exports.createPost = createPost;
