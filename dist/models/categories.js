"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const Sequelize_1 = __importDefault(require("../SequelizeClient/Sequelize"));
const sequelize_1 = require("sequelize");
const post_1 = require("./post");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    imagePath: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: Sequelize_1.default,
    modelName: "Categories",
});
post_1.Post.belongsTo(Category, { foreignKey: "categoryId" }); // Many-to-One association
Category.hasMany(post_1.Post, { foreignKey: "categoryId" }); //
