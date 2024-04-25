import { UserRelationship } from "../../entities/userRelationship";


export interface profileInteractor{
    updateProfile(data: { userId: string, username: string, name: string, website: string, bio: string, gender: string, image: string }): Promise<User | null>;
    followUser(userRelationship: UserRelationship): Promise<boolean>;
    unfollowUser(userRelationship: UserRelationship): Promise<boolean>;

}