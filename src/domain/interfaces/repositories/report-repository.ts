export interface IReportRepository {
    saveReportContent(user: string, content: string): Promise<boolean>
    isUserReported(user: string, reportedUser: string): Promise<boolean>
    saveReportUser(user: string, reportedUser: string,category:string,reason:string): Promise<boolean>
    isPostReported(user: string,post: string): Promise<boolean>
    saveReportPost(user:string, post: string,category:string,reason:string): Promise<boolean>
    checkIfFeedbackExists(postId:string): Promise<boolean>
    AddreportFeedback(postId:string,reason:string): Promise<boolean>
}