import { Request, Response } from "express";
import { postSchema } from "../../SchemaValidation/SchemaValidation";
import { ID, PostSchema, UserSchema } from "../../Types/Types";
import { Model } from "sequelize";
import { Post } from "../../models/post";
import modifyBody from "../../Utils/BodyModify/body";
import elasticClient from "../../ElasticSearchClient/ElasticSearchClient";
import { User } from "../../models/user";

export async function createPost(req: Request, res: Response): Promise<void> {
	try {
		const post: PostSchema = req.body;

		const imagePath: string = req.file ? req.file.path : null;

		const user: User = await User.findByPk(post.userId);

		await postSchema.validate({ ...post, imagePath: imagePath });

		const newPost: Model<PostSchema, PostSchema> = await Post.create({
			title: post.title,
			body: modifyBody(post.body),
			name: post.name,

			topic: post.topic,
			userId: post.userId,
			imagePath: imagePath,
			categoryId: post.categoryId,
		});
		await newPost.save();

		await elasticClient.index({
			index: "posts",
			document: {
				id: newPost.dataValues.id,
				title: post.title,
				username: user.firstName,
				body: post.body,
				topic: post.topic,
				imagePath: imagePath,
			},
		});

		res.status(200).send(newPost.toJSON());
	} catch (error) {
		res.status(400).json({ message: error });
	}
}
