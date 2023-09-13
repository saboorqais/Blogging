"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'postgres',
    host: "127.0.0.1",
    database: 'blog',
    password: 'saboor9494',
    port: 5432
});
exports.default = client;
