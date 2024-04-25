import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dlbq8zlgn', 
    api_key: '116937341467834', 
    api_secret: 'kDjPDhGc2j3i5A5ynJ8C7pT2Kfw' 
});

export const uploadToProfileCloudinary = async (req:Request, res:Response, next: NextFunction) => {
    try {
        console.log('Uploading image to Cloudinary...',req.file);

      
        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
            folder: 'profile_images',
        });
  
        console.log('Image uploaded successfully to Cloudinary');
        console.log('Cloudinary response:', result);
  
        req.imageUrl = result.secure_url;
        next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
};

export default uploadToProfileCloudinary;
