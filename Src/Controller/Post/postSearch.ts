import { Request } from "express";
import { Response } from "express";
import { Post } from "../../models/post";
import elasticClient from "../../ElasticSearchClient/ElasticSearchClient";
import { SearchSchema } from "../../Types/Types";

export async function postSearch(req: Request, res: Response) {
	const { keyword } = req.query;
	const searchKeyword = keyword.toString();
	console.log(keyword);
	try {
		// Call the searchPostsByKeyword function to perform the search
		const results = await elasticClient.search<SearchSchema>({
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
		console.log(results);

		// Return the search results as a JSON response
		res.json({ results: [...results.hits.hits] });
	} catch (error) {
		// Handle any errors that may occur during the search
		console.error("Error during search:", error);
		res.status(500).json({ error: "An error occurred during the search." });
	}
}
