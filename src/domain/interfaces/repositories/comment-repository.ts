export interface CommentRepository{
    addComment(postId: string,comment:string,author:string): Promise<boolean>
    getComments(postId: string): Promise<Comment[] | null> 
    addCommentReply(postId:string,commentId: string,reply:string,author:string) : Promise<boolean>
}