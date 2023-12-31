"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCreate_1 = require("../Controller/User/userCreate");
const authentication_1 = __importDefault(require("../Controller/login/authentication"));
const refresh_1 = __importDefault(require("../Controller/token/refresh"));
const posts_1 = __importDefault(require("./posts"));
const comment_1 = __importDefault(require("./comment"));
const category_1 = __importDefault(require("./category"));
const router = (0, express_1.Router)();
router.post("/login", authentication_1.default);
router.post("/user/", userCreate_1.createUser);
router.post("/refresh/", refresh_1.default);
router.use("/posts", posts_1.default);
router.use("/comments", comment_1.default);
router.use("/category", category_1.default);
exports.default = router;
