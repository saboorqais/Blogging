"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryCreate_1 = require("../Controller/Category/categoryCreate");
const multerInstance_1 = __importDefault(require("../Utils/multerInstance/multerInstance"));
const categoryGet_1 = require("../Controller/Category/categoryGet");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/selection/", categoryGet_1.selectionCategory);
categoryRouter.get("/posts", categoryGet_1.getCategoryWithRelatedPosts);
categoryRouter.get("/:id", categoryGet_1.getCategory);
categoryRouter.post("/", (0, multerInstance_1.default)("category"), categoryCreate_1.createCategory);
exports.default = categoryRouter;
