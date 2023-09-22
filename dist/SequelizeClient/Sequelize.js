"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("blog", "postgres", "saboor9494", {
    host: "127.0.0.1",
    dialect: "postgres",
});
exports.default = sequelize;
