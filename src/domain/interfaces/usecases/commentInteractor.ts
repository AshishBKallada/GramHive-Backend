export interface commentInteractor {
    getComments(postId: string): Promise<any[] | null>
    addComment(postId: string, comment: string, author: string): Promise<any>;
    addCommentReply(postId: string, commentId: string, reply: string, author: string): Promise<boolean>
    deleteComment(postId: string, commentId: string): Promise<boolean>;
    deleteCommentReply(postId: string, commentId: string,replyId:string): Promise<boolean>;

}