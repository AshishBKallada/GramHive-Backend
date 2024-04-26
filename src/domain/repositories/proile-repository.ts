import { profileRepository } from "../interfaces/repositories/profile-repository";
import { UserRelationship } from "../entities/userRelationship";
import { User } from "../entities/user";
import userModel from "../../data/data-sources/mongodb/models/user";
import postModel from "../../data/data-sources/mongodb/models/post";
import { PostData } from "../entities/PostData";
import followModel from "../../data/data-sources/mongodb/models/followers";
import { followers } from "../entities/follower";


export class profileRepositoryImpl implements profileRepository {
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
console.log('UNFOLLOW USER 3');


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

    async getFollowers(userId: string): Promise<followers[] | null> {
        try {
            const followerData = await followModel.find({ follower_id: userId })
            const follower_ids = followerData.map((follower: any) => follower.followed_id);
            const followers = await userModel.find({ _id: { $in: follower_ids } });

            if (followers) {
                return followers
            } else {
                return null;
            }

        } catch (error) {
            console.log(error);
            return null;

        }
    }

    async getFollowing(userId: string): Promise<followers[] | null> {
        try {
            const followingData = await followModel.find({ followed_id: userId })
            const following_ids = followingData.map((follower: any) => follower.follower_id);
            const following = await userModel.find({ _id: { $in: following_ids } });

            if (following) {
                return following
            } else {
                return null;
            }

        } catch (error) {
            console.log(error);
            return null;

        }
    }

}