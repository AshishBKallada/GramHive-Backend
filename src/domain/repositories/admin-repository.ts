import { Admin } from "../entities/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import adminModel from "../../data/data-sources/mongodb/models/admin";
import userModel from "../../data/data-sources/mongodb/models/user";
import { User } from "../entities/user";
import ReportModel from "../../data/data-sources/mongodb/models/report";
import postModel from "../../data/data-sources/mongodb/models/post";
import AdModel from "../../data/data-sources/mongodb/models/ad";
const jwt = require('jsonwebtoken');

export class AdminRepositoryImpl implements AdminRepository {
    async findByCredentials(email: string, password: string): Promise<{ admin: Admin | null, token: string | null }> {
        console.log('Admin Repository: findByCredentials', email, password);

        const admin = await adminModel.findOne({ email: email });
        let token: string | null = null;

        if (admin) {
            console.log('admin valid');
            token = this.generateToken(admin.email);
        }

        return { admin: admin ? admin.toObject() as Admin : null, token: token };
    }


    generateToken = (email: any): string => {
        return jwt.sign({ adminId: email }, 'shaantha_UK', { expiresIn: '1h' })
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

    async getReviews(filter: string): Promise<any> {
        try {
            let reviews;
            console.log(filter);

            switch (filter) {
                case 'all':
                    reviews = await ReportModel.find({ type: 'content' }).populate('author', 'username name image');
                    break;
                case 'saved':
                    reviews = await ReportModel.find({ type: 'content', isSaved: true }).populate('author', 'username name image');
                    break;
                case 'today':
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    reviews = await ReportModel.find({
                        type: 'content',
                        isSaved: true,
                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }
                    }).populate('author', 'username name image');
                    break;

                default:
                    throw new Error('Invalid filter');
            }
            console.log(reviews);

            return reviews;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch reviews: ${error.message}`);
            }
        }
    }

    async getPostReports(): Promise<any> {
        try {
            return await ReportModel.find({ type: 'post' })
                .populate({
                    path: 'reportedPost',
                    populate: {
                        path: 'userId',
                        select: 'username name image'
                    }
                })
                .populate({
                    path: 'users.author',
                    select: 'username name image'
                })


        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch post reports: ${error.message}`);
            }
            throw new Error('Failed to fetch post reports due to an unknown error');
        }
    }


    async postBan(postId: string): Promise<string> {
        try {
            console.log('3', postId);

            const post = await postModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const isBanned = post.isBan;
            post.isBan = !isBanned;
            await post.save();
            return post.isBan ? 'Post has been banned' : 'Post has been unbanned';
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to ban/unban post: ${error.message}`);
            }
            throw new Error('Failed to ban/unban post due to an unknown error');
        }
    }

    async userReports(): Promise<any> {
        try {

            const reports = await ReportModel.find({ type: 'user' })
                .populate('reportedUser', 'username name image')
                .populate({
                    path: 'users.author', select: 'username name image'
                });
            console.log('reports', reports);

            return reports;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch reports: ${error.message}`);
            }
            throw new Error('Failed to fetch reports due to an unknown error');
        }
    }


    async getTransactions(): Promise<any> {
        try {
            const transactions = await AdModel.find({}).populate('user', 'username name');
            if (!transactions) {
                throw new Error('Database query returned null');
            }
            return transactions;
        } catch (error) {
            console.error('Error in TransactionsRepository:', error);
            throw error;
        }
    }






}