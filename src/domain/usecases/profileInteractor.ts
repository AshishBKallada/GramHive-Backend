import { profileRepository } from "../interfaces/repositories/profile-repository";
import { profileInteractor } from "../interfaces/usecases/profileInteractor";
import { UserRelationship } from "../entities/userRelationship";
import { PostData } from "../entities/PostData";
import { followers } from "../entities/follower";

export class profileInteractorImpl implements profileInteractor {
    constructor(private readonly Repository: profileRepository) { }
    async updateProfile(Data: { userId: string, username: string, name: string, website: string, bio: string, gender: string, image: string }): Promise<User | null> {

        try {
            const newData = {
                userId: Data.userId,
                username: Data.username,
                name: Data.name,
                image: Data.image,
                website: Data.website,
                bio: Data.bio,
                gender: Data.gender
            };

            console.log('NewDataXXXXXXXXXXXX', newData);

            const updatedUser = await this.Repository.updateProfile(newData);

            return updatedUser ? updatedUser : null;

        } catch (error) {
            console.error('Error updating user profile:', error);
            return null;
        }

    }


    async getProfileData(userId: string): Promise<{ posts: PostData[] | null, followers: followers[] | null, following: followers[] | null }> {
        try {
            const savedPostsData = await this.Repository.getSavedPostsData(userId);
            const posts = await this.Repository.getProfilePosts(userId,savedPostsData);
            const followers = await this.Repository.getFollowers(userId);
            const following = await this.Repository.getFollowing(userId);

            return { posts, followers, following };
        } catch (error) {
            console.error('Error fetching profile posts:', error);
            return null;
        }
    }
    async followUser(userRelationship: UserRelationship): Promise<boolean> {
        try {
            const success = await this.Repository.followUser(userRelationship);
            if (success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async unfollowUser(userRelationship: UserRelationship): Promise<boolean> {
        try {
            console.log('UNFOLLOW USER 2');

            const success = await this.Repository.unfollowUser(userRelationship);
            if (success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async getFollowers(userId: string): Promise<followers[] | null> {
        try {
            const followers = await this.Repository.getFollowers(userId);
            return followers
        } catch (errror) {
            throw new Error("Failed to get followers.");
        }
    }

    async getFollowing(userId: string): Promise<followers[] | null> {
        try {
            const following = await this.Repository.getFollowing(userId);
            return following
        } catch (errror) {
            throw new Error("Failed to get following.");
        }
    }


    async RemoveFollower(userRelationship: UserRelationship): Promise<boolean> {
        try {
            const isFollowerRemoved = await this.Repository.removeFollower(userRelationship);
            return isFollowerRemoved ? true : false;
        } catch (error) {
            throw new Error("Failed to remove follower.");
        }
    }

    async getSaved(userId: string): Promise<PostData[]> {
        try {
            
            const savedPostIds = await this.Repository.getSavedPostIds(userId)
            console.log(savedPostIds); 
            
            if (savedPostIds) {
                
                const savedPosts = await this.Repository.fetchSavedPosts(savedPostIds)
                return savedPosts

            }
        } catch (error) {
            throw new Error("Failed to retreive saved posts.");
        }
    }

} 