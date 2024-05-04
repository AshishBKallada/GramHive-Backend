import { profileRepository } from "../interfaces/repositories/profile-repository";
import { UserRelationship } from "../entities/userRelationship";
import { User } from "../entities/user";
import userModel from "../../data/data-sources/mongodb/models/user";
import postModel from "../../data/data-sources/mongodb/models/post";
import { PostData } from "../entities/PostData";
import followModel from "../../data/data-sources/mongodb/models/followers";
import { followers } from "../entities/follower";
import saveModel from "../../data/data-sources/mongodb/models/save";

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
    async getProfilePosts(userId: string, savedPostsData: any): Promise<PostData[] | null> {
        try {
            const posts = await postModel.find({ userId: userId }).populate('tags');
            console.log('SAVED POSTSDATA', savedPostsData);
    
            if (posts && savedPostsData) {
                const savedPostIds = savedPostsData.map((objectId: any) => objectId.toString());
                posts.forEach(post => {
                    console.log('post', post._id);
    
                    post.isSaved = savedPostIds.includes(post._id.toString());
                    if (post.isSaved) {
                        console.log('set');
                    }
                });
            }
            console.log('PROFILE REPO GET POSTS', posts);
    
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


            const deleteuserRelationship = await followModel.findOneAndDelete(userRelationship);
            if (deleteuserRelationship) {

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

    async removeFollower(userRelationship: UserRelationship): Promise<boolean> {
        try {
            const isFollowerRemoved = await followModel.findOneAndDelete(userRelationship)

            return isFollowerRemoved ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getSavedPostIds(userId: string): Promise<any | null> {
        try {

            const posts = await saveModel.find({ user: userId });
            const postIds = posts.map(post => post.post);
            return postIds
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async fetchSavedPosts(postIds: string[]): Promise<PostData[] | null> {
        try {

            const savedPosts = await postModel.find({ _id: { $in: postIds } })
                .populate('userId', '+name +username +image')
                .populate({ path: 'userId', select: '-password -gender -email -website -isBan -bio' });


            return savedPosts ? savedPosts : null
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getSavedPostsData(userId: string): Promise<PostData[] | null> {
        try {
            const savedPosts = await saveModel.find({ user: userId }).select('post');
            const savedPostIds = savedPosts.map(savedPost => savedPost.post);
            return savedPostIds;

        } catch (error) {
            console.error('Error retreiving saved posts:', error);
            return null;
        }
    }
}