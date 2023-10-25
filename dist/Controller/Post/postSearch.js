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
exports.postSearch = void 0;
const ElasticSearchClient_1 = __importDefault(require("../../ElasticSearchClient/ElasticSearchClient"));
function postSearch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { keyword } = req.query;
        const searchKeyword = keyword.toString();
        try {
            // Call the searchPostsByKeyword function to perform the search
            const results = yield ElasticSearchClient_1.default.search({
                index: "posts",
                body: {
                    query: {
                        bool: {
                            should: [
                                {
                                    match: {
                                        title: searchKeyword,
                                    },
                                },
                                {
                                    match: {
                                        name: searchKeyword,
                                    },
                                },
                                ,
                                {
                                    match: {
                                        body: searchKeyword,
                                    },
                                },
                                {
                                    match: {
                                        username: searchKeyword,
                                    },
                                },
                            ],
                        },
                    },
                },
            });
            if (!results) {
                res.status(404).json({ message: "No Post Found" });
            }
            // Return the search results as a JSON response
            res.json({ results: [...results.hits.hits] });
        }
        catch (error) {
            // Handle any errors that may occur during the search
            res.status(500).json({ message: "An error occurred during the search." });
        }
    });
}
exports.postSearch = postSearch;
