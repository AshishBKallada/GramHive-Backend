import { Admin } from "../../entities/admin";
import { User } from "../../entities/user";

export interface AdminInteractor {
    login(credentials: { email: string, password: string }): Promise<{ admin: Admin | null, token: string | null }>
    getAllUsers(): Promise<User[]>;
    blockUser(userId: string): Promise<{ success: boolean; status: string }>;
}