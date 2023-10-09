"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Swagger API',
            version: '1.0.0',
            description: 'A sample Express.js API with Swagger documentation',
        },
    },
    apis: ['./Routes/*.js'], // Specify the path to your API route files
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
