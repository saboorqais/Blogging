"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const storage = (entity) => {
    return multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = `./uploads/${entity}`;
            fs_1.default.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            // Generate a unique filename for the uploaded file
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const extname = path_1.default.extname(file.originalname);
            cb(null, `${entity}-${uniqueSuffix}${extname}`);
        },
    });
};
const uploadImage = (entity) => (0, multer_1.default)({ storage: storage(entity) }).single("image");
exports.default = uploadImage;
