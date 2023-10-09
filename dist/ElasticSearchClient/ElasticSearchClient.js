"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const elasticClient = new elasticsearch_1.Client({
    node: "http://localhost:9200", // Replace with your Elasticsearch server's URL.
});
exports.default = elasticClient;
