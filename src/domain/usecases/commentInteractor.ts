import { CommentRepository } from "../interfaces/repositories/comment-repository";
import { commentInteractor } from "../interfaces/usecases/commentInteractor";

export class commentInteractorImpl implements commentInteractor {
    constructor(private readonly Repository: CommentRepository) { }

    async addComment(postId: string, comment: string, author: string): Promise<boolean> {
        try {
            const isCommentAdded = await this.Repository.addComment(postId, comment, author);
            if (isCommentAdded) {
                return true;
            } else {
                false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getComments(postId: string): Promise<Comment[] | null> {
        try {
            const comments = await this.Repository.getComments(postId);
            return comments;
        } catch (error) {
            console.error('Error getting comments:', error);
            return null;
        }
    }


    async addCommentReply(postId: string, commentId: string, reply: string, author: string): Promise<boolean> {
        try {
            const isCommentReplyAdded = await this.Repository.addCommentReply(postId, commentId, reply, author);
            if (isCommentReplyAdded) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error getting likes:', error);
            return false;
        }
    }

    async deleteComment(postId: string, commentId: string): Promise<boolean> {
        try {
            const isCommentDeleted = await this.Repository.deleteComment(postId, commentId);
            return isCommentDeleted;
        } catch (error) {
            throw error; 
        }
    }
    
    async deleteCommentReply(postId: string, commentId: string,replyId:string): Promise<boolean>{
        try {
            const isCommentReplyDeleted = await this.Repository.deleteCommentReply(postId, commentId,replyId);
            return isCommentReplyDeleted;
        } catch (error) {
            throw error;
        }
    }

}