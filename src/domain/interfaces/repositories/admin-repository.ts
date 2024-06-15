import { Admin } from "../../entities/admin";
import { User } from "../../entities/user";

export interface AdminRepository {
    findByCredentials(email: string, password: string): Promise<{ admin: Admin | null, token: string | null }>
    getAllUsers(): Promise<User[]>;
    blockUser(userId: string): Promise<{ success: boolean; status: string }>;
    getReviews(filter:string): Promise<any>
    getPostReports(): Promise<any>
    postBan(postId:string): Promise<string>
    userReports():Promise<any>
    getTransactions():Promise<any>
}

