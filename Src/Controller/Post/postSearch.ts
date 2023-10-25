import { Request } from "express";
import { Response } from "express";
import elasticClient from "../../ElasticSearchClient/ElasticSearchClient";
import { SearchSchema } from "../../Types/Types";

export async function postSearch(req: Request, res: Response) {
	const { keyword } = req.query;
	const searchKeyword = keyword.toString();
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
		if(!results){
      res.status(404).json({ message: "No Post Found" });
    }
		// Return the search results as a JSON response
		res.json({ results: [...results.hits.hits] });
	} catch (error) {
		// Handle any errors that may occur during the search
		
		res.status(500).json({ message: "An error occurred during the search." });
	}
}
