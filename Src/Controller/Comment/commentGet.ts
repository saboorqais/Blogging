import { Response, Request } from "express";
import { Comment } from "../../models/comments";
import { User } from "../../models/user";
import paginate from "express-paginate";
export async function getComment(req: Request, res: Response): Promise<void> {
    try {
        const comments: Comment[] = await Comment.findAll({
            where: {
                postId: req.params.id,
            },
        });
        if(comments){
            res.status(404).send({message:"No Comments Found"});
        }
        // Handle the retrieved data (posts)
        res.status(200).send(comments);
    } catch (error) {
        // Handle any errors

        res.status(500).send(error);
    }
}
export async function editComment(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const comment: Comment = req.body;

        const editComment = await Comment.findByPk(id);
        if (!editComment) {
            res.status(400).send({ message: "No Comment Exist" });
        }
        await editComment.update({
            userId: comment.userId,
            text: comment.text,
            parentId: comment.parentId,
            postId: comment.postId,
        });
        // Handle the retrieved data (posts)
        res.status(200).send(editComment.toJSON());
    } catch (error) {
        // Handle any errors
        console.log(error);
        res.status(400).send({ message:error});
    }
}

export async function getNLevelComments(req: Request, res: Response) {
    try {
        const { postId, parentId } = req.params;
        console.log(parentId);
        const parenCheck = parentId === "null" ? null : parentId;
        const comments = await Comment.findAll({
            where: {
                postId: postId,
                parentId: parenCheck,
            },
            attributes: {
                exclude: ["userId"], // Exclude the specified fields
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"], // Replace with field names to omit
                    },
                },
            ],
        });
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).send({ message:error});
    }
}
export async function getNLevelComment(req: Request, res: Response) {
    try {
        const { postId, parentId } = req.params;
        console.log(parentId);
        const parenCheck = parentId === "null" ? null : parentId;
        const comments = await Comment.findOne({
            where: {
                postId: postId,
                parentId: parenCheck,
            },
            attributes: {
                exclude: ["userId"], // Exclude the specified fields
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"], // Replace with field names to omit
                    },
                },
            ],
        });
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).send({ message:error});
    }
}

export async function getPaginateComment(req: Request, res: Response) {
    try {
        // Access the offset calculated by express-paginate

        const { page, limit } = req.query;
        const { postId, parentId } = req.params;
        const parenCheck = parentId === "null" ? null : parentId;
        const { count, rows } = await Comment.findAndCountAll({
            offset: (parseInt(page as string) - 1) * parseInt(limit as string),
            limit: parseInt(limit as string),
            where: {
                postId,
                parentId: parenCheck,
            },
            
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"], // Replace with field names to omit
                    },
                },
            ],
        });
        const pageCount = Math.ceil(count / parseInt(limit as string));
        const pagination = {
            currentPage: parseInt(page as string),
            pageCount,
            pageSize: parseInt(limit as string),
            totalCount: count,
        };
        // Generate the URL of the next page if it exists
        const nextPage =
            pageCount > parseInt(page as string)
                ? paginate.getArrayPages(req)(parseInt(page as string) + 1, pageCount, parseInt(page as string))
                : null;

        const response = {
            results: rows,
            pagination,
            nextPage,
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
    }
}

export async function getCommentsWithChildren(postId: string, parentId = null) {
    const comments = await Comment.findAll({
        where: {
            postId: postId,
            parentId: parentId,
        },
        attributes: {
            exclude: ["userId"], // Exclude the specified fields
        },
        include: [
            {
                model: Comment,
                as: "replies",
                required: false,
            },
            {
                model: User,
                attributes: {
                    exclude: ["password"], // Replace with field names to omit
                },
            },
        ],
    });

    for (const comment of comments) {
        const childReplies = await getCommentsWithChildren(postId, comment.id);
        comment.setDataValue("replies", childReplies);
    }

    return comments;
}
export async function deleteNestedComments(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deleted = await deleteCommentAndChildren(parseInt(id));
        
        res.status(200).send(deleted);
    } catch (error) {
        res.status(400).json({ message: "Not Deleted" });
    }
}
async function deleteCommentAndChildren(commentId: number) {
    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
        // Comment not found, do nothing
        return;
    }

    // Delete the comment
    await comment.destroy();

    // Find and delete children comments
    const childrenComments = await Comment.findAll({
        where: { parentId: commentId },
    });

    for (const childComment of childrenComments) {
        await deleteCommentAndChildren(childComment.id);
    }
}
