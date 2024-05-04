import { uploadFileToFirebase } from "../../functions/uploadStory";
import { IStoryUploader } from "../interfaces/external-lib/IStoryUploader";

export class StoryUploaderImpl implements IStoryUploader {
    async uploadStory(filePath: string, fileBuffer: Buffer, contentType: string): Promise<any> {
         const imageUrl = await uploadFileToFirebase(filePath, fileBuffer, contentType);
         return imageUrl? imageUrl : null;
    }


}