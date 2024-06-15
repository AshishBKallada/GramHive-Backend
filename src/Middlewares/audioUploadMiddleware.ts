import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { s3 } from '../config/s3Config';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const audioUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload.single('wavfile')(req, res, (err) => {
        if (err) {
            console.error('File upload failed:', err);
            return res.status(500).json({ message: 'File upload failed', error: err.message });
        }

        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const file = req.file as Express.Multer.File;
        console.log('Uploaded file:', file);

        const params = {
            Bucket:'xoro-blah-blah-bucket-api-south-1' as string,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
                return res.status(500).json({ message: 'Error uploading file to S3', error: err.message });
            }

            console.log('File uploaded successfully. S3 location:', data.Location);

            req.audio = data.Location;
            next();
        });
    });
};

declare global {
    namespace Express {
        interface Request {
            audio?: string;
        }
    }
}
