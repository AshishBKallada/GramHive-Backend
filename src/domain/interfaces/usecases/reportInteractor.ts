export interface IReportInteractor {
    reportContent(user: string, content: string): Promise<boolean>
    reportUser(user: string, reportedUser: string,category:string,reason:string): Promise<boolean>
    reportPost(user: string, post: string,category:string,reason:string): Promise<boolean>
    reportFeedback(postId: string, reason: string): Promise<boolean | { message: string }>}