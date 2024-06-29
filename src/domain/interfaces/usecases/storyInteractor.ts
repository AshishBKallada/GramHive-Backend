import { Story } from "../../entities/story"

export interface storyInteractor {
    uploadStory(userId:string,storyFile:any): Promise<boolean>
    getStories(userId:string): Promise<Story[] | null>
    updateView(userId:string, viewer:string) : Promise<boolean>
}