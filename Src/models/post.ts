import sequelize from "../SequelizeClient/Sequelize";
import { DataTypes, Model } from "sequelize";
import { PostSchema } from "../Types/Types";
import { Comment } from "./comments";
import { Op } from "sequelize";
import { User } from "./user";
import elasticClient from "../ElasticSearchClient/ElasticSearchClient";

class Post extends Model<PostSchema> implements PostSchema {
	public id!: number;
	public name!: string;
	public title!: string | null;
	public body!: string;
	public topic!: string;
	public imagePath!: string;
	public userId!: number;
	public categoryId!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	static async searchPostsByKeyword(keyword: string) {
		return Post.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${keyword}%`,
						},
					},
					{
						title: {
							[Op.like]: `%${keyword}%`,
						},
					},
					{
						body: {
							[Op.like]: `%${keyword}%`,
						},
					},
				],
			},
			include: [
				{
					model: User,
					as: "User",
				},
				// Include other associations as needed
			],
		});
	}
	static async  CreateIndex() {
		try {
			const posts = await Post.findAll(); // Retrieve data from Sequelize

			// Index data into Elasticsearch
			const bulkBody = [];
			for (const post of posts) {
				bulkBody.push({
					index: {
						_index: "posts", // Replace with your Elasticsearch index name
						_id: post.id.toString(),
					},
				});
				bulkBody.push({
					// Map your Sequelize model fields to Elasticsearch document fields
					title: post.title,
					body: post.body,
					name: post.name,
					// ... other fields
				});
			}

			await elasticClient.bulk({ body: bulkBody });

			console.log("Data indexed successfully.");
		} catch (error) {
			console.error("Indexing error:", error);
		}
	}
}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		title: {
			type: DataTypes.STRING,
		},
		body: {
			type: DataTypes.TEXT,
		},
		topic: {
			type: DataTypes.STRING,
		},
		userId: {
			// Define userId as a foreign key
			type: DataTypes.INTEGER,
			references: {
				model: "Users", // Referencing the User model
				key: "id", // Using the primary key 'id'
			},
		},
		categoryId: {
			// Define userId as a foreign key
			type: DataTypes.INTEGER,
			references: {
				model: "Categories", // Referencing the User model
				key: "id", // Using the primary key 'id'
			},
		},
		imagePath: {
			// Define userId as a foreign key
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "Post",
	}
);
Comment.belongsTo(Post, { foreignKey: "postId" }); // Many-to-One association
Post.hasMany(Comment, { foreignKey: "postId" });

export { Post };
