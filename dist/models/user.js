"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Sequelize_1 = __importDefault(require("../SequelizeClient/Sequelize"));
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const post_1 = require("./post");
const comments_1 = require("./comments");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            const saltRounds = 10;
            const hashedPassword = bcrypt_1.default.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword);
        },
    },
}, {
    sequelize: Sequelize_1.default,
    modelName: 'Users',
});
post_1.Post.belongsTo(User, { foreignKey: 'userId' }); // Many-to-One association
User.hasMany(post_1.Post, { foreignKey: 'userId' }); //
comments_1.Comment.belongsTo(User, { foreignKey: 'userId' }); // Many-to-One association
User.hasMany(comments_1.Comment, { foreignKey: 'userId' });
