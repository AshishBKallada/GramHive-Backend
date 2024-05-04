import followModel from "../../data/data-sources/mongodb/models/followers";
import storyModel from "../../data/data-sources/mongodb/models/story";
import { Story } from "../entities/story";
import { StoryRepository } from "../interfaces/repositories/story-repository";

export class StoryRepositoryimpl implements StoryRepository {
    async addStory(userId: string, imageUrl: string): Promise<boolean> {
        try {
            const addStory = await storyModel.create({ user: userId, story: imageUrl });
            return addStory ? true : false;
        } catch (error) {
            console.error(error);
            return false
        }
    }
    async getStories(userId: string): Promise<Story[] | null> {
        try {
            const following = await followModel.find({ followed_id: userId });
            const users = following.map((user: string) => user.follower_id)

            const stories = await storyModel.find({ $or: [{ user: { $in: users } }, { user: userId }] }).populate('user').populate('seenBy.user');
            console.log('STORIES',stories);

            return stories?stories:null;

        } catch (error) {
            console.error(error);
            return null;
        }
    }

}