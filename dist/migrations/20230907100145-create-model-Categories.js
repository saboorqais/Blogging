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
        yield queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            categoryName: {
                type: sequelize_1.DataTypes.STRING
            },
            description: {
                type: sequelize_1.DataTypes.STRING
            }
        });
        // here go all migration changes
    })),
    down: (queryInterface) => queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        // here go all migration undo changes
        yield queryInterface.dropTable("Categories");
    }))
};
