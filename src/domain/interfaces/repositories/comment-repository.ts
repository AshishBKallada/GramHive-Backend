export interface CommentRepository{
    addComment(postId: string,comment:string,author:string): Promise<any>
    getComments(postId: string): Promise<Comment[] | null> 
    addCommentReply(postId:string,commentId: string,reply:string,author:string) : Promise<boolean>
    deleteComment(postId: string,commentId:string): Promise<boolean>
    deleteCommentReply(postId: string,commentId:string,replyId:string): Promise<boolean>

}