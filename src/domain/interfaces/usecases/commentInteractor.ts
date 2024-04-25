export interface commentInteractor{
    getComments(postId: string): Promise<comments[] | null> 
    addComment(postId: string,comment:string,author:string): Promise<boolean>;
    addCommentReply(postId:string,commentId: string,reply:string,author:string) : Promise<boolean>

}