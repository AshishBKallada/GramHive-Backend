import { User } from '../../entities/user';
import { SignupData } from '../../entities/SignupData';

export interface UserRepository {
    findByCredentials(username: string, password: string): Promise<{ user: User | null, message: string, token: string | null }>;
    save(user: User): Promise<{ user: User | null, token: string | null }>;
    userExists(email: string): Promise<boolean>;
    saveToDB(signupData: SignupData, otp: string): Promise<boolean>;
    updateOTP(emailId: string,newOtp:string) : Promise<boolean>;
    verifyOtp(otp: string): Promise<User | null>;
    getFilteredUsers(filter: string): Promise<User[] | null>;
    getSearchuser(userId: string): Promise<{ user: User | null, followers: User[], following: User[] }>;
};
