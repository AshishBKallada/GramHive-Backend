import { User } from '../entities/user';
import { UserRepository } from '../interfaces/repositories/user-repository';
import userModel from '../../data/data-sources/mongodb/models/user';
import { SignupData } from '../entities/SignupData';
import otpModel from '../../data/data-sources/mongodb/models/otp';
import followModel from '../../data/data-sources/mongodb/models/followers';
import { generateAccessToken } from '../../functions/accessToken-generator';
const jwt = require('jsonwebtoken');


export class UserRepositoryImpl implements UserRepository {

    async findByGoogleId(googleId: string): Promise<User | null> {
        return await userModel.findOne({ googleId });
    }

    async create(userData: any): Promise<User | null> {
        const user = new userModel(userData);
        await user.save();
        return user;
    }

    async findByCredentials(username: string, password: string): Promise<{ user: User | null, message: string, token: string | null }> {
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
    async updateLocation(userId: string, latitude: number, longitude: number): Promise<boolean> {
        try {
            const isLocationUpdated = await userModel.findByIdAndUpdate(
                userId,
                { $set: { 'location.latitude': latitude, 'location.longitude': longitude } },
                { new: true }
            );
            return !!isLocationUpdated;
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





    async getFilteredUsers(filter: string): Promise<User[] | null> {
        try {
            const userData = await userModel.find({ $or: [{ username: { $regex: new RegExp(filter, 'i') } }, { name: { $regex: new RegExp(filter, 'i') } }] });
            const users = userData.map(({ _id, username, name, image }) => ({ _id, username, name, image }));

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


    async getLocations(userId: string): Promise<User[] | null> {
        try {

            const followingUsers = await followModel.find({ followed_id: userId });

            const followeduserIds = followingUsers.map(follow => follow.follower_id);
            console.log('Following users:', followeduserIds);

            const users = await userModel.find({ _id: { $in: followeduserIds } });
            console.log('users0000000000000000000000: ', users);

            return users;
        } catch (error) {
            console.error('Error retrieving searched user data:', error);
            return null;
        }
    }

    async getSuggestedUsers(userId: string): Promise<User[] | null> {
        try {
            const followedUsers = await followModel.find({ followed_id: userId });
            const followedIds = await followedUsers.map((user: any) => user.followed_id);

            if (!followedIds.length) return null;

            const suggestedFollowerIds = await followModel.aggregate([
                { $match: { followed_id: { $in: followedIds.map(f => f._id) } } },
                { $match: { follower_id: { $ne: userId } } },
                { $group: { _id: null, suggestedFollowerIds: { $addToSet: '$follower_id' } } },
                { $project: { suggestedFollowerIds: 1 } },
            ]);

            const suggestedIds = suggestedFollowerIds[0]?.suggestedFollowerIds || [];
            const projection = { username: 1, name: 1, image: 1 };
            const mutualUsers = await userModel.find({ _id: { $in: suggestedIds } }, projection)
            return mutualUsers;

        } catch (error) {
            console.error('Error fetching note:', error);
            throw error;
        }
    }

    async checkEmail(email: string): Promise<boolean> {
        try {
            const user = await userModel.findOne({ email: email });
            return !!user;
        } catch (error) {
            console.error('Error checking if user exists :', error);
            throw error;
        }
    }

    async findById(id: string): Promise<User | null> {
        const user = await userModel.findById(id);
        return user ? user : null;
    }

    async resetPassword(userId: string, newPassword: string): Promise<boolean> {
        try {
            console.log('repo');
            
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { password: newPassword },
                { new: true }
            );

            if (!updatedUser) {
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error resetting password:', error);
            return false;
        }
    }

    async findByEmail(email:string): Promise<User | null>{
        const user = await userModel.findOne({email:email});
        return user ? user : null;
    }




}
