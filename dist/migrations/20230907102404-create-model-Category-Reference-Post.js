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
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.addColumn('Posts', 'categoryId', {
            type: sequelize_1.DataTypes.INTEGER
        });
        yield queryInterface.addConstraint("Posts", {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'posts_categoryId_fkey',
            // Constraint name
            references: {
                table: 'Categories',
                field: 'id' // Referenced column in the 'Users' table
            },
            onDelete: 'cascade',
            onUpdate: 'cascade' // Optional: Specify the ON UPDATE action
        });
        // here go all migration changes
    })),
    down: (queryInterface) => queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        // here go all migration undo changes
        yield queryInterface.removeConstraint("Posts", "categoryId");
        yield queryInterface.removeColumn('Posts', 'categoryId');
    }))
};
