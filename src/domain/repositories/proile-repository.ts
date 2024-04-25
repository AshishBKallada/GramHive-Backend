import { profileRepository } from "../interfaces/repositories/profile-repository";
import { UserRelationship } from "../entities/userRelationship";
import { User } from "../entities/user";
import userModel from "../../data/data-sources/mongodb/models/user";
import postModel from "../../data/data-sources/mongodb/models/post";
import { PostData } from "../entities/PostData";
import followModel from "../../data/data-sources/mongodb/models/followers";

export class profileRepositoryImpl implements profileRepository{
    async updateProfile(newData: Partial<User>): Promise<User | null> {
        try {
            const userId = newData.userId;
            const updatedFields: Partial<User> = {};

            if (newData.username) updatedFields.username = newData.username;
            if (newData.name) updatedFields.name = newData.name;
            if (newData.image) updatedFields.image = newData.image;
            if (newData.gender) updatedFields.gender = newData.gender;
            if (newData.bio) updatedFields.bio = newData.bio;
            if (newData.website) updatedFields.website = newData.website;

            const updatedUser = await userModel.findByIdAndUpdate(userId, updatedFields, { new: true });

            if (updatedUser) {
                console.log('PROFILE UPDATED');
                return updatedUser;
            } else {
                console.log('PROFILE NOT UPDATED');
                return null;
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            return null;
        }
    }
    async getProfilePosts(userId: string): Promise<PostData[] | null> {
        try {
            console.log('getPROfilePOSTS');
            
            const posts = await postModel.find({ userId: userId });
            return posts.length > 0 ? posts : null;
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return null;
        }
    }
    
    async followUser(userRelationship: UserRelationship): Promise<boolean> {
        try {
            console.log(userRelationship);


            const adduserRelationship = await followModel.create(userRelationship);
            if (adduserRelationship) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error', error)
            return false;
        }
    }
    async unfollowUser(userRelationship: UserRelationship): Promise<boolean> {
        try {
            console.log(userRelationship);


            const deleteuserRelationship = await followModel.findOneAndDelete(userRelationship);
            if (deleteuserRelationship) {
                console.log('1');

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error', error)
            return false;
        }
    }
}