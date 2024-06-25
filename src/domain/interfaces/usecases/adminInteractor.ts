import { Admin, LoginRequest } from "../../entities/admin/admin";
import { User } from "../../entities/user";

export interface AdminInteractor {
    login(request: LoginRequest): Promise<{ admin: any, token: string } | null>
    getAllUsers(): Promise<User[]>;
    blockUser(userId: string): Promise<{ success: boolean; status: string }>;
    getReviews(filter: string): Promise<any>
    getPostReports(): Promise<any>
    PostBan(PostId: string): Promise<{ success: boolean; message: string }>
    userReports(): Promise<any>
    getTransactions(): Promise<any>
    getDashboard():Promise<any>
    getChartOne():Promise<any>
    getChartTwo():Promise<any>
}