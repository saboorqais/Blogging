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
exports.createPost = void 0;
const SchemaValidation_1 = require("../../SchemaValidation/SchemaValidation");
const post_1 = require("../../models/post");
const body_1 = __importDefault(require("../../Utils/BodyModify/body"));
const ElasticSearchClient_1 = __importDefault(require("../../ElasticSearchClient/ElasticSearchClient"));
const user_1 = require("../../models/user");
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = req.body;
            const imagePath = req.file ? req.file.path : null;
            const user = yield user_1.User.findByPk(post.userId);
            yield SchemaValidation_1.postSchema.validate(Object.assign(Object.assign({}, post), { imagePath: imagePath }));
            const newPost = yield post_1.Post.create({
                title: post.title,
                body: (0, body_1.default)(post.body),
                name: post.name,
                topic: post.topic,
                userId: post.userId,
                imagePath: imagePath,
                categoryId: post.categoryId,
            });
            yield newPost.save();
            yield ElasticSearchClient_1.default.index({
                index: "posts",
                document: {
                    id: newPost.dataValues.id,
                    title: post.title,
                    username: user.firstName,
                    body: post.body,
                    topic: post.topic,
                    imagePath: imagePath,
                },
            });
            res.status(200).send(newPost.toJSON());
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    });
}
exports.createPost = createPost;
