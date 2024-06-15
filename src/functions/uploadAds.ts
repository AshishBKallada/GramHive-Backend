import { uploadFileToFirebase } from "./uploadStory";

export async function uploadFilesToFirebase(files: Express.Multer.File[]): Promise<string[]> {
    const imageUrls: string[] = [];
    
    for (const file of files) {
      const filePath = `your-directory/${file.originalname}`; 
      const contentType = file.mimetype;
  
      try {
        const imageUrl = await uploadFileToFirebase(filePath, file.buffer, contentType);
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error('Error uploading file to Firebase:', error);
      }
    }
    
    return imageUrls;
  }