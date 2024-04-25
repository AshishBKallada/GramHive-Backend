import { Admin } from "../entities/admin";
import { AdminInteractor } from "../interfaces/usecases/adminInteractor";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { User } from "../entities/user";


export class AdminInteractorImpl implements AdminInteractor {
    constructor(private readonly Repository: AdminRepository) { }

    async login(credentials: { email: string, password: string }): Promise<{admin:Admin | null,token:string | null}> {
        try {
            const {admin,token} = await this.Repository.findByCredentials(credentials.email, credentials.password);
            return {admin,token};
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
    
    async getAllUsers(): Promise<User[]> {
        try {
            const users: User[] = await this.Repository.getAllUsers();
            
            return users;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    }
    async blockUser(userId: string): Promise<{ success: boolean; status: string }> {
        console.log('1', userId);
    
        try {
            const isBlocked = await this.Repository.blockUser(userId);
            console.log(isBlocked);
            const status = isBlocked.status
            console.log('usecaseImpl', isBlocked.status);
            
            return { success: true, status };
        } catch (e) {
            console.error('Error blocking user:', e);
            return { success: false, status: 'An error occurred' };
        }
    }
    
}