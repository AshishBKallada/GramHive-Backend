import { User } from "../../entities/user";
import { SignupData } from "../../entities/SignupData";

export interface UserInteractor {
    login(credentials: { username: string, password: string }): Promise<{ user: User | null, message: string, token: string | null }>;
    signup(userData: { username: string, name: string, password: string, email: string, image: string }): Promise<{ user: User | null, token: string | null }>;
    sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }>
    verifyotp(otp: string): Promise<{ success: boolean, token: string | null }>;
    getSearchData(filter: string): Promise<User[] | null>;
    getSearchUser(userId: string): Promise<{ user: User | null; followers: User[]; following: User[]; } | null>
}
