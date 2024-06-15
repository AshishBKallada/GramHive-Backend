import { UserRelationship } from "../../entities/userRelationship";
import { PostData } from "../../entities/PostData";
import { followers } from "../../entities/follower";
import { INotification } from "../../entities/notifications";

export interface profileInteractor{
    updateProfile(data: { userId: string, username: string, name: string, website: string, bio: string, gender: string, image: string }): Promise<User | null>;
    followUser(userRelationship: UserRelationship): Promise<INotification | boolean>;
    unfollowUser(userRelationship: UserRelationship): Promise<boolean>;
    getProfileData(userId: string): Promise<{posts:PostData[] | null,followers:followers[] | null,following:followers[] | null}>;
    getFollowers(userId: string): Promise<followers[] | null>;
    getFollowing(userId: string): Promise<followers[] | null>;
    RemoveFollower(userRelationship: UserRelationship): Promise<boolean>;
    getSaved(userId: string): Promise<PostData[]>;
}