"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = exports.postSchema = exports.userSchema = void 0;
const Yup = __importStar(require("yup"));
const Role = {
    Admin: "admin",
    User: "user",
};
exports.userSchema = Yup.object().shape({
    id: Yup.number(),
    firstName: Yup.string().required(),
    lastName: Yup.string(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    role: Yup.string().oneOf(Object.values(Role), "Invalid Role Selection").required("Role is required"),
});
exports.postSchema = Yup.object().shape({
    id: Yup.number(),
    title: Yup.string().max(15).required(),
    body: Yup.string().required(),
    name: Yup.string().required(),
    topic: Yup.string().required(),
    userId: Yup.number().required(),
    categoryId: Yup.number().required(),
    imagePath: Yup.string().required(),
});
exports.commentSchema = Yup.object().shape({
    id: Yup.number(),
    text: Yup.string().max(60).required(),
    userId: Yup.number().required(),
    parentId: Yup.number().nullable(),
    postId: Yup.number().required(),
    replies: Yup.array().optional(),
});
