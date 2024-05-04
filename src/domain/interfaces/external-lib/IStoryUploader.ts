export interface IStoryUploader{
    uploadStory(filePath:string, fileBuffer:Buffer, contentType:string):Promise<any>;
}