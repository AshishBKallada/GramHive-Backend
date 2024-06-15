import followModel from "../../data/data-sources/mongodb/models/followers";
import storyModel from "../../data/data-sources/mongodb/models/story";
import { Story } from "../entities/story";
import { StoryRepository } from "../interfaces/repositories/story-repository";
import mongoose from "mongoose";

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
          const followedUserIds = following.map((user: any) => user.follower_id);
      
          const stories = await storyModel.aggregate([
            {
              $match: {
                $or: [
                  { user: { $in: followedUserIds } }, 
                  { user: new mongoose.Types.ObjectId(userId) }, 
                ],
              },
            },
            {
              $group: {
                _id: '$user',
                stories: { $push: '$story' }, 
              },
            },
            {
              $lookup: {
                from: 'users', 
                localField: '_id',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
            {
                $project: {
                  user: {
                    _id: 1,
                    username: 1,
                    name: 1,
                    email: 1,
                    image:1,
                  },
                  stories: 1,
                },
              },
              
          ]);
      
      
          return stories;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      
      
      

}