import { UserRelationship } from "../../entities/userRelationship";
import { PostData } from "../../entities/PostData";
import { followers } from "../../entities/follower";

export interface profileInteractor{
    updateProfile(data: { userId: string, username: string, name: string, website: string, bio: string, gender: string, image: string }): Promise<User | null>;
    followUser(userRelationship: UserRelationship): Promise<boolean>;
    unfollowUser(userRelationship: UserRelationship): Promise<boolean>;
    getProfileData(userId: string): Promise<{posts:PostData[] | null,followers:followers[] | null,following:followers[] | null}>;
    getFollowers(userId: string): Promise<followers[] | null>;
    getFollowing(userId: string): Promise<followers[] | null>;

}