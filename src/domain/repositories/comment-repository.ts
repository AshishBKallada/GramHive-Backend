import { CommentRepository } from "../interfaces/repositories/comment-repository";
import ReplyModel from "../../data/data-sources/mongodb/models/reply";
import postModel from "../../data/data-sources/mongodb/models/post";

export class CommentRepositoryImpl implements CommentRepository {
    async addComment(postId: string, comment: string, author: string): Promise<boolean> {
        try {
            console.log('1');
            console.log(postId, comment, author);

            const post = await postModel.findById(postId);
            if (!post) {
                console.error('Post not found');
                return false;
            } else {
                console.log('post kitteetto');

            }
            const newComment = {
                comment: comment,
                author: author,
                createdAt: new Date()
            };
            post.comments.push(newComment);

            const isCommentAdded = await post.save();

            if (isCommentAdded) {
                console.log('2');

                return true;
            } else {
                console.log('vayya');

                return false;
            }
        } catch (error) {
            console.error('Error', error)
            return false;
        }
    }

    async getComments(postId: string): Promise<Comment[] | null> {
        try {
            console.log('2222', postId);

            const post = await postModel
                .findById(postId)
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author replies.author',
                        model: 'User',
                    }
                });
            if (!post) {
                console.error('Post not found');
                return null;
            }
            return post.comments;

        } catch (error) {
            console.error('Error getting comments:', error);
            return null;
        }
    }



    async addCommentReply(postId: string, commentId: string, reply: string, author: string) {
        try {
            console.log('444444444444444444', postId, commentId, reply, author);
            const post = await postModel.findById(postId);
            if (!post) {
                console.log('No post found');
                return false;
            }
            const comment = post.comments.find(c => c.id === commentId);
            if (!comment) {
                console.log('No comment found');
                return false;
            }
            console.log('COMMENT', comment.comment);

            const newReply = new ReplyModel({
                reply: reply,
                author: author,
            });
            console.log(newReply);

            comment.replies.push(newReply);

            const updatedComment = await post.save();
            if (updatedComment) {
                console.log('Reply added successfully');
                return true;
            } else {
                console.log('Failed to add reply');
                return false;
            }

        } catch (error) {
            console.error('Error getting likes:', error);
            return false;
        }
    }

    async deleteComment(postId: string, commentId: string): Promise<boolean> {
        try {
            console.log(postId + commentId + ' deleted');

            const updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            );
            if (updatedPost) {
                console.log('Comment deleted successfully');

            }

            return updatedPost !== null;

        } catch (error) {
            console.error("Error deleting comment:", error);
            return false;
        }
    }

    async deleteCommentReply(postId: string, commentId: string, replyId: string): Promise<boolean> {
        try {
            const isCommentReplyDeleted = await postModel.findByIdAndUpdate(
                postId,
                { $pull: { 'comments.$[comment].replies': { _id: replyId } } },
                { arrayFilters: [{ 'comment._id': commentId }] }
            );
            return isCommentReplyDeleted !== null;

        } catch (error) {
            console.error("Error deleting comment:", error);
            return false;
        }
    }


}