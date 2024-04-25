import { Admin } from "../entities/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import adminModel from "../../data/data-sources/mongodb/models/admin";
import userModel from "../../data/data-sources/mongodb/models/user";
import { User } from "../entities/user";
const jwt = require('jsonwebtoken');

export class AdminRepositoryImpl implements AdminRepository{
    async findByCredentials(email: string, password: string): Promise<{ admin: Admin | null, token: string | null }> {
        console.log('Admin Repository: findByCredentials',email,password);
    
        const admin = await adminModel.findOne({ email: email });
        let token: string | null = null;
    
        if (admin) {
            console.log('admin valid');
            token = this.generateToken(admin.email);
        }
    
        return { admin: admin ? admin.toObject() as Admin : null, token: token };
    }


    generateToken = (email:any):string =>{
        return jwt.sign({adminId:email},'shaantha_UK',{ expiresIn: '1h'})
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await userModel.find({});
            // console.log('adminrepository',users);
            
            return users.map(user => user.toObject() as User);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
    async blockUser(userId: string): Promise<{ success: boolean; status: string }> {
        console.log('2', userId);
    
        try {
            const user = await userModel.findById(userId);
    
            if (!user) {
                console.log('User not found.');
                return { success: false, status: 'User not found' };
            }
    
            user.isBan = !user.isBan;
    
            await user.save();
    
            const status = user.isBan ? 'banned' : 'unbanned';
    
            console.log(`User ${user.username} has been ${status}.`);
    
            return { success: true, status };
        } catch (e) {
            console.error('Error blocking user:', e);
            return { success: false, status: 'An error occurred' };
        }
    }
    
    

}