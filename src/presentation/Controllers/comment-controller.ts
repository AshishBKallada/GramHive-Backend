import { commentInteractor } from "../../domain/interfaces/usecases/commentInteractor";
import { Request, Response, NextFunction } from "express";

export class CommentController {

    constructor(private readonly interactor: commentInteractor) { }

    async addComments(req: Request, res: Response) {
        try {
            const postId: string = req.params.postId;
            const { comment, author } = req.body;
            console.log(comment, '4');

            const isCommentAdded = await this.interactor.addComment(postId, comment, author);
            if (isCommentAdded) {

                return res.status(200).json({ success: true, message: 'User was followed successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to follow the user' });
            }
        } catch (error) {
            return res.status(404).json({ success: false, message: 'internal server error' });
        }
    }

    async getComments(req: Request, res: Response) {
        try {
            const postId: string = req.params.postId;
            console.log('1', postId);

            const comments = await this.interactor.getComments(postId);

            if (comments) {
                console.log('COMMENTS', comments);

                return res.status(200).json({ success: true, comments });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to get comments' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    async addCommentReply(req: Request, res: Response) {
        try {
            const { postId, commentId } = req.params;
            const { reply, author } = req.body;
            console.log(postId, author, reply, commentId, '4');

            const isCommentReplyAdded = await this.interactor.addCommentReply(postId, commentId, reply, author);
            if (isCommentReplyAdded) {

                return res.status(200).json({ success: true, message: 'Comment reply was added successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to add reply to the comment' });
            }
        } catch (error) {
            return res.status(404).json({ success: false, message: 'internal server error' });
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            const commentId = req.params.commentId;

            const success = await this.interactor.deleteComment(postId, commentId);

            if (success) {
                return res.status(200).json({ success: true, message: 'Comment was deleted successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to delete comment' });
            }

        } catch (error) {
            return res.status(404).json({ success: false, message: error.message });
        }
    }

    async deleteCommentReply(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            const commentId = req.params.commentId;
            const replyId = req.params.replyId;

            const success = await this.interactor.deleteCommentReply(postId, commentId, replyId);

            if (success) {
                console.log('COMMENT  REPlyDELETE CONTROLLER 2');
                return res.status(200).json({ success: true, message: 'Comment was deleted successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to delete comment' });
            }

        } catch (error) {
            return res.status(404).json({ success: false, message: error.message });
        }
    }

}