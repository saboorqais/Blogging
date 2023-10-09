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
exports.deleteNestedComments = exports.getCommentsWithChildren = exports.getPaginateComment = exports.getNLevelComment = exports.getNLevelComments = exports.getNestedComments = exports.editComment = exports.getComment = void 0;
const comments_1 = require("../../models/comments");
const user_1 = require("../../models/user");
const express_paginate_1 = __importDefault(require("express-paginate"));
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
function editComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const comment = req.body;
            const editComment = yield comments_1.Comment.findByPk(id);
            if (!editComment) {
                res.status(400).send({ message: "No Comment Exist" });
            }
            yield editComment.update({
                userId: comment.userId,
                text: comment.text,
                parentId: comment.parentId,
                postId: comment.postId,
            });
            // Handle the retrieved data (posts)
            res.status(200).send(editComment.toJSON());
        }
        catch (error) {
            // Handle any errors
            console.log(error);
            res.status(400).send(error);
        }
    });
}
exports.editComment = editComment;
function getNestedComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const topLevelComments = yield getCommentsWithChildren(id, null);
            res.status(200).send(topLevelComments[0]);
        }
        catch (error) { }
    });
}
exports.getNestedComments = getNestedComments;
function getNLevelComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { postId, parentId } = req.params;
            console.log(parentId);
            const parenCheck = parentId === "null" ? null : parentId;
            const comments = yield comments_1.Comment.findAll({
                where: {
                    postId: postId,
                    parentId: parenCheck,
                },
                attributes: {
                    exclude: ["userId"], // Exclude the specified fields
                },
                include: [
                    {
                        model: user_1.User,
                        attributes: {
                            exclude: ["password"], // Replace with field names to omit
                        },
                    },
                ],
            });
            res.status(200).send(comments);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
exports.getNLevelComments = getNLevelComments;
function getNLevelComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { postId, parentId } = req.params;
            console.log(parentId);
            const parenCheck = parentId === "null" ? null : parentId;
            const comments = yield comments_1.Comment.findOne({
                where: {
                    postId: postId,
                    parentId: parenCheck,
                },
                attributes: {
                    exclude: ["userId"], // Exclude the specified fields
                },
                include: [
                    {
                        model: user_1.User,
                        attributes: {
                            exclude: ["password"], // Replace with field names to omit
                        },
                    },
                ],
            });
            res.status(200).send(comments);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
exports.getNLevelComment = getNLevelComment;
function getPaginateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Access the offset calculated by express-paginate
            const { page, limit } = req.query;
            const { postId, parentId } = req.params;
            const parenCheck = parentId === "null" ? null : parentId;
            const { count, rows } = yield comments_1.Comment.findAndCountAll({
                offset: (parseInt(page) - 1) * parseInt(limit),
                limit: parseInt(limit),
                where: {
                    postId,
                    parentId: parenCheck,
                },
                include: [
                    {
                        model: user_1.User,
                        attributes: {
                            exclude: ["password"], // Replace with field names to omit
                        },
                    },
                ],
            });
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
            res.status(400).send(error);
        }
    });
}
exports.getPaginateComment = getPaginateComment;
function getCommentsWithChildren(postId, parentId = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const comments = yield comments_1.Comment.findAll({
            where: {
                postId: postId,
                parentId: parentId,
            },
            attributes: {
                exclude: ["userId"], // Exclude the specified fields
            },
            include: [
                {
                    model: comments_1.Comment,
                    as: "replies",
                    required: false,
                },
                {
                    model: user_1.User,
                    attributes: {
                        exclude: ["password"], // Replace with field names to omit
                    },
                },
            ],
        });
        for (const comment of comments) {
            const childReplies = yield getCommentsWithChildren(postId, comment.id);
            comment.setDataValue("replies", childReplies);
        }
        return comments;
    });
}
exports.getCommentsWithChildren = getCommentsWithChildren;
function deleteNestedComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deleted = yield deleteCommentAndChildren(parseInt(id));
            res.status(200).send(deleted);
        }
        catch (error) {
            res.status(400).json({ message: "Not Deleted" });
        }
    });
}
exports.deleteNestedComments = deleteNestedComments;
function deleteCommentAndChildren(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find the comment by ID
        const comment = yield comments_1.Comment.findByPk(commentId);
        if (!comment) {
            // Comment not found, do nothing
            return;
        }
        // Delete the comment
        yield comment.destroy();
        // Find and delete children comments
        const childrenComments = yield comments_1.Comment.findAll({
            where: { parentId: commentId },
        });
        for (const childComment of childrenComments) {
            yield deleteCommentAndChildren(childComment.id);
        }
    });
}
