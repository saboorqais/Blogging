"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const Sequelize_1 = __importDefault(require("../SequelizeClient/Sequelize"));
const sequelize_1 = require("sequelize");
const comments_1 = require("./comments");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
    },
    userId: {
        // Define userId as a foreign key
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id", // Using the primary key 'id'
        },
    },
    categoryId: {
        // Define userId as a foreign key
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Categories",
            key: "id", // Using the primary key 'id'
        },
    },
    imagePath: {
        // Define userId as a foreign key
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: Sequelize_1.default,
    modelName: "Post",
});
comments_1.Comment.belongsTo(Post, { foreignKey: "postId" }); // Many-to-One association
Post.hasMany(comments_1.Comment, { foreignKey: "postId" });
