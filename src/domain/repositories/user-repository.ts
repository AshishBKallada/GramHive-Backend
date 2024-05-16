import { User } from '../entities/user';
import { UserRepository } from '../interfaces/repositories/user-repository';
import userModel from '../../data/data-sources/mongodb/models/user';
import { SignupData } from '../entities/SignupData';
import otpModel from '../../data/data-sources/mongodb/models/otp';
import followModel from '../../data/data-sources/mongodb/models/followers';
import { generateAccessToken } from '../../functions/accessToken-generator';
const jwt = require('jsonwebtoken');


export class UserRepositoryImpl implements UserRepository {

    async findByCredentials(username: string, password: string): Promise<{ user: User | null, message: string, token: string | null }> {
        console.log('USER REPOSITORY ------------------');
        console.log(username, password);

        const user = await userModel.findOne({
            $or: [
                { email: username },
                { username: username }
            ]
        });

        console.log('user', user);

        let message = '';
        let token = null;

        if (!user) {
            message = 'Invalid User';
        } else {
            if (password !== user.password) {
                console.log('Invalid password');
                message = 'Invalid password';
            } else {
                token = await generateAccessToken(user);
                console.log('Token', token);
            }
        }

        if (user && !message) {
            return { user: user.toObject() as User, message, token };
        } else {
            console.log('message', message);

            return { user: null, message, token };
        }
    }

    async updateOTP(emailId: string, newOtp: string): Promise<boolean> {
        try {
            const isUpdateOTP = await otpModel.findOneAndUpdate(
                { email: emailId },
                { $set: { otp: newOtp } }
            );
            return isUpdateOTP != null;
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }




    async save(user: User): Promise<{ user: User | null, token: string | null }> {
        console.log('Repository');
        console.log(user);
        const { name, email, username, password, image = 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' } = user;

        const newUser = new userModel({ name, email, username, password, image });
        await newUser.save();

        let token = await generateAccessToken(user)
        console.log('Token', token);
        return { user: newUser ? newUser.toObject() as User : null, token };
    }






    async userExists(email: string): Promise<boolean> {
        console.log('3', email);

        const userExists = await userModel.findOne({ email: email });
        return !!userExists;
    }


    async saveToDB(signupData: SignupData, otp: string): Promise<boolean> {
        try {
            const { name, email, username, password } = signupData;
            const isAddedToDB = await otpModel.create({ name: name, email: email, username: username, password: password, otp: otp });
            return isAddedToDB ? true : false;
        } catch (error) {
            console.error("Error saving data to database:", error);
            return false;
        }
    }

    async verifyOtp(otp: string): Promise<User | null> {
        try {
            console.log('3');

            const user = await otpModel.findOne({ otp: otp });
            console.log('user', user);

            return user ? user : null;
        } catch (error) {
            console.error('Error verifying OTP from database:', error);
            return null;
        }
    }

    // async addSignupUser(otp: string): Promise<boolean> {
    //     try {
    //         console.log('5');

    //         const user = await otpModel.findOne({ otp: otp });
    //         if (user) {
    //             const { name, email, username, password } = user;
    //             const addSignupUser = await userModel.create({ name, email, username, password });
    //             console.log('6',addSignupUser);

    //             return addSignupUser ? true : false;
    //         } else {
    //             return false; 
    //         }
    //     } catch (error) {
    //         console.error('Error adding user to database:', error);
    //         return false;
    //     }
    // }



    async getFilteredUsers(filter: string): Promise<User[] | null> {
        try {
            console.log('3', filter);
            const userData = await userModel.find({ $or: [{ username: { $regex: new RegExp(filter, 'i') } }, { name: { $regex: new RegExp(filter, 'i') } }] });
            const users = userData.map(({ _id, username, name, image }) => ({ _id, username, name, image }));
            console.log('Users found', users);

            return users ? users : null;

        } catch (error) {
            console.error('Error retrieving posts:', error);
            return null;
        }
    }

    async getSearchuser(userId: string): Promise<{ user: User | null, followers: User[], following: User[] }> {
        try {
            const user = await userModel.findById(userId).select('-password');
            const followersData = await followModel.find({ follower_id: userId });
            const followingData = await followModel.find({ followed_id: userId });
            console.log('user', user);

            console.log('followers:', followersData);
            console.log('following:', followingData);

            const followers_ids = followersData.map((follower: any) => follower.followed_id);
            console.log('followers_ids:', followers_ids);

            const following_ids = followingData.map((followed: any) => followed.follower_id);
            console.log('following_ids:', following_ids);

            const followers = await userModel.find({ _id: { $in: followers_ids } });
            const following = await userModel.find({ _id: { $in: following_ids } });

            if (user) {
                return { user, followers, following };
            } else {
                return { user: null, followers: [], following: [] };
            }
        } catch (error) {
            console.error('Error retrieving searched user data:', error);
            return { user: null, followers: [], following: [] };
        }
    }







}
