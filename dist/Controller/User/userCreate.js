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
exports.createUser = void 0;
const user_1 = require("../../models/user");
const SchemaValidation_1 = require("../../SchemaValidation/SchemaValidation");
const sequelize_1 = require("sequelize");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            yield SchemaValidation_1.userSchema.validate(Object.assign(Object.assign({}, req.body), { role: "user" }));
            const newUser = yield user_1.User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                role: body.role,
            });
            yield newUser.save();
            res.status(200).send({ response: newUser.toJSON() });
        }
        catch (error) {
            console.log(error);
            if (error instanceof sequelize_1.UniqueConstraintError) {
                // Handle unique constraint violation (e.g., duplicate email)
                res.status(400).json("User with this email already exists");
            }
            else if (error instanceof sequelize_1.ValidationError) {
                // Handle other validation errors
                const validationErrors = error.errors.map((e) => e.message);
                res.status(400).json({ error: validationErrors });
            }
            else {
                res.status(400).json({ error: error.message });
            }
        }
    });
}
exports.createUser = createUser;
