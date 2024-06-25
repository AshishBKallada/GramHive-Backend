import { User } from "../../entities/user";

export interface AdminRepository {
    findByEmail(email: string): Promise<any>
    getAllUsers(): Promise<User[]>;
    blockUser(userId: string): Promise<{ success: boolean; status: string }>;
    getReviews(filter: string): Promise<any>
    getPostReports(): Promise<any>
    postBan(postId: string): Promise<string>
    userReports(): Promise<any>
    getTransactions(): Promise<any>
    dashboardData(): Promise<any>
    chartOneData(): Promise<any>
    chartTwoData(): Promise<any>

}

