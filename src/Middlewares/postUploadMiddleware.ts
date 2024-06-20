import { Request, Response, NextFunction } from 'express';
import { s3 } from '../config/s3Config';

interface UploadedFile {
    url: string;
}

export const PostUploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];
    console.log('files' + files)
    const directory = 'posts'; 

    try {
        const uploadedFiles: UploadedFile[] = await Promise.all(files.map(async (file, index) => {
            const params = {
                Bucket: 'xoro-blah-blah-bucket-api-south-1' as string,
                Key: `${directory}/${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const s3Response = await s3.upload(params).promise();

            return {
                url: s3Response.Location,
            };
        }));

        req.body.urls = uploadedFiles.map(file => file.url);
        console.log('uploaded posts',req.body.cloudinaryUrl);
        
        next();
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Error uploading files' });
    }
};
