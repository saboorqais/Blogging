'use strict';
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
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('Comment', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER
                },
                text: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                userId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                parentId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    unique: true,
                    references: {
                        model: 'Comment',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                postId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Post',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
            });
            yield queryInterface.addConstraint('Comment', {
                fields: ['userId'],
                type: 'foreign key',
                name: 'comments_userId_fkey',
                references: {
                    table: 'Users',
                    field: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            yield queryInterface.addConstraint('Comment', {
                fields: ['postId'],
                type: 'foreign key',
                name: 'comments_postId_fkey',
                references: {
                    table: 'Post',
                    field: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            yield queryInterface.addConstraint('Comment', {
                fields: ['parentId'],
                type: 'foreign key',
                name: 'comments_parentId_fkey',
                references: {
                    table: 'Comment',
                    field: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
            yield queryInterface.removeConstraint('Comment', 'comments_userId_fkey');
            yield queryInterface.removeConstraint('Comment', 'comments_postId_fkey');
            yield queryInterface.removeConstraint('Comment', 'comments_parentId_fkey');
            yield queryInterface.dropTable('Comment');
        });
    }
};
