import { INotification } from "../entities/notifications";
import { CommentRepository } from "../interfaces/repositories/comment-repository";
import { INotificationRepository } from "../interfaces/repositories/notification-repository";
import { commentInteractor } from "../interfaces/usecases/commentInteractor";
import { Server as SocketIOServer } from 'socket.io';

export class commentInteractorImpl implements commentInteractor {
    constructor(private readonly Repository: CommentRepository, private readonly NotiRepository: INotificationRepository, private readonly io: SocketIOServer) { }

    async addComment(postId: string, comment: string, author: string): Promise<any> {
        try {
            const { data } = await this.Repository.addComment(postId, comment, author);
            if (data) {
                const notification: INotification = {
                    userId: data.userId,
                    type: 'comment',
                    postId: postId,
                    message: `${data.author} commented on your post`,
                    createdAt: new Date(),
                    read: false
                };
                await this.NotiRepository.addNotification(notification);              
                return notification;
            } else {
               return false;
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

    async deleteCommentReply(postId: string, commentId: string, replyId: string): Promise<boolean> {
        try {
            const isCommentReplyDeleted = await this.Repository.deleteCommentReply(postId, commentId, replyId);
            return isCommentReplyDeleted;
        } catch (error) {
            throw error;
        }
    }

}