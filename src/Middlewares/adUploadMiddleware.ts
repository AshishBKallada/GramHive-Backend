import { Request, Response, NextFunction } from 'express';
import { uploadFileToFirebase } from '../functions/uploadStory';

export async function adUploadMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls: string[] = [];
    for (const file of req.files) {
      const imageUrl = await uploadFileToFirebase(`ads/${file.originalname}`, file.buffer, file.mimetype);
      imageUrls.push(imageUrl);
    }

    req.imageUrls = imageUrls; 
    next();
  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
