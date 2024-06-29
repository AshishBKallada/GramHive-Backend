import { Story } from "../../entities/story";

export interface StoryRepository {
    addStory(userId: string, imageUrl: string): Promise<boolean>;
    getStories(userId: string): Promise<Story[] | null>
    updateView(userId:string, viewer:string) : Promise<boolean>
}