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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.headers['authorization'];
    if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET_KEY);
        const accessToken = jsonwebtoken_1.default.sign({ user: decoded }, process.env.SECRET_KEY, { expiresIn: '3h' });
        res
            .header('Authorization', accessToken)
            .send(decoded);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});
exports.default = refresh;
