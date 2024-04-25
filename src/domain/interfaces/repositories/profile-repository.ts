import { UserRelationship } from '../../entities/userRelationship';
import { User } from '../../entities/user';

export interface profileRepository{
    updateProfile(newData: Partial<User>): Promise<User | null>
    followUser(userRelationship: UserRelationship): Promise<boolean>;
    unfollowUser(userRelationship: UserRelationship): Promise<boolean>;
}