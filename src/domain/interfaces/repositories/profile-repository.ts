import { UserRelationship } from '../../entities/userRelationship';
import { User } from '../../entities/user';
import { followers } from '../../entities/follower';
import { PostData } from '../../entities/PostData';

export interface profileRepository {
    updateProfile(newData: Partial<User>): Promise<User | null>
    followUser(userRelationship: UserRelationship): Promise<boolean>;
    unfollowUser(userRelationship: UserRelationship): Promise<boolean>;
    getProfilePosts(userId: string): Promise<PostData[] | null>;
    getFollowers(userId: string): Promise<followers[] | null>;
    getFollowing(userId: string): Promise<followers[] | null>;
}