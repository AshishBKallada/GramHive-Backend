import { StoryRepository } from "../interfaces/repositories/story-repository";
import { storyInteractor } from "../interfaces/usecases/storyInteractor";
import { IStoryUploader } from "../interfaces/external-lib/IStoryUploader";
import { Story } from "../entities/story";

export class storyInteractorImpl implements storyInteractor {
    constructor(private readonly Repository: StoryRepository, private readonly uploader: IStoryUploader) { }

    async uploadStory(userId: string, storyFile: any): Promise<boolean> {
        try {
            const fileBuffer = storyFile.buffer;
            const filePath = `users/${userId}/uploads/${Date.now()}_${Math.floor(Math.random() * 1000)}`;
            let contentType = '';

            if (storyFile.mimetype.startsWith('image')) {
                contentType = 'image/jpeg';
            } else if (storyFile.mimetype.startsWith('video')) {
                contentType = 'video/mp4';
            }

            const imageUrl = await this.uploader.uploadStory(filePath, fileBuffer, contentType)
            console.log('SUCCESSFULLY UPLOADED TO Firebase', imageUrl);

            if (!imageUrl) {
                return false;
            }
            const uploadStoryToDB = await this.Repository.addStory(userId, imageUrl)

            return uploadStoryToDB ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getStories(userId: string): Promise<Story[] | null> {
        try {
            const stories = await this.Repository.getStories(userId)
            return stories
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    async updateView(userId:string, viewer:string) : Promise<boolean>{
        try {
            const success = await this.Repository.updateView(userId, viewer);
            return success
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}