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
exports.Post = void 0;
const Sequelize_1 = __importDefault(require("../SequelizeClient/Sequelize"));
const sequelize_1 = require("sequelize");
const comments_1 = require("./comments");
const sequelize_2 = require("sequelize");
const user_1 = require("./user");
const ElasticSearchClient_1 = __importDefault(require("../ElasticSearchClient/ElasticSearchClient"));
class Post extends sequelize_1.Model {
    static searchPostsByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return Post.findAll({
                where: {
                    [sequelize_2.Op.or]: [
                        {
                            name: {
                                [sequelize_2.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            title: {
                                [sequelize_2.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            body: {
                                [sequelize_2.Op.like]: `%${keyword}%`,
                            },
                        },
                    ],
                },
                include: [
                    {
                        model: user_1.User,
                        as: "User",
                    },
                    // Include other associations as needed
                ],
            });
        });
    }
    static CreateIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield Post.findAll(); // Retrieve data from Sequelize
                // Index data into Elasticsearch
                const bulkBody = [];
                for (const post of posts) {
                    bulkBody.push({
                        index: {
                            _index: "posts",
                            _id: post.id.toString(),
                        },
                    });
                    bulkBody.push({
                        // Map your Sequelize model fields to Elasticsearch document fields
                        title: post.title,
                        body: post.body,
                        name: post.name,
                        // ... other fields
                    });
                }
                yield ElasticSearchClient_1.default.bulk({ body: bulkBody });
                console.log("Data indexed successfully.");
            }
            catch (error) {
                console.error("Indexing error:", error);
            }
        });
    }
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
