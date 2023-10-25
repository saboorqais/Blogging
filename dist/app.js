"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./Routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_paginate_1 = __importDefault(require("express-paginate"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const Swagger_1 = __importDefault(require("./Utils/Swagger/Swagger"));
const swagger_ui_express_1 = require("swagger-ui-express");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
const port = 3002;
const staticFilesDirectory = path_1.default.join(__dirname, "uploads");
app.use(express_paginate_1.default.middleware(10, 50));
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Serve static files (including images) from the 'uploads' directory
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api-docs", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(Swagger_1.default));
app.use("/", routes_1.default);
app.use("/uploads", express_1.default.static(staticFilesDirectory));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
