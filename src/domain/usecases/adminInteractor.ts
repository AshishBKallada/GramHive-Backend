import { Admin, LoginRequest } from "../entities/admin/admin";
import { AdminInteractor } from "../interfaces/usecases/adminInteractor";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { User } from "../entities/user";
import { AuthService } from "../services/admin/AuthService";


export class AdminInteractorImpl implements AdminInteractor {
    constructor(private readonly Repository: AdminRepository,private readonly authService:AuthService) { }

    async login(request: LoginRequest): Promise<{ admin: any, token: string } | null> {
        const { email, password } = request;
        const admin = await this.Repository.findByEmail(email);
        if (!admin) {
          throw new Error('Invalid email');
        }
    
    if (admin.password !== password) {
        throw new Error('Invalid password');
      }
        const token = this.authService.generateToken({ id: admin.id, email: admin.email });
    
        return { admin, token };
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
    async getReviews(filter: string): Promise<any> {
        try {
            return await this.Repository.getReviews(filter);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch reviews: ${error.message}`);
            }
        }
    }
    async getPostReports(): Promise<any> {
        try {
            return await this.Repository.getPostReports();

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch reviews: ${error.message}`);
            }
        }
    }
    async PostBan(postId: string): Promise<{ success: boolean; message: string }> {
        try {
            console.log('2');

            const message = await this.Repository.postBan(postId);
            return { success: true, message };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to ban/unban post: ${error.message}`);
            }
            throw new Error('Failed to ban/unban post due to an unknown error');
        }
    }

    async userReports(): Promise<any> {
        try {
            const reports = await this.Repository.userReports();
            return reports;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to ban/unban post: ${error.message}`);
            }
            throw new Error('Failed to ban/unban post due to an unknown error');
        }
    }

    async getTransactions(): Promise<any> {
        try {
            const transactions = await this.Repository.getTransactions();
            if (!transactions || transactions.length === 0) {
                throw new Error('No transactions found');
            }
            return transactions;
        } catch (error) {
            console.error('Error in TransactionsInteractor:', error);
            throw error;
        }
    }


}