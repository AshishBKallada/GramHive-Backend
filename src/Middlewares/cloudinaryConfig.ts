import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dlbq8zlgn', 
  api_key: '116937341467834', 
  api_secret: 'kDjPDhGc2j3i5A5ynJ8C7pT2Kfw' 
});

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
} 

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cloudinaryUrls: string[] = [];

    if (req.file) {
      const file: CloudinaryFile = req.file as CloudinaryFile;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'GramHive-Project', 
        } as any,
        (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (err) {
            console.error('Cloudinary upload error:', err);
            return next(err);
          }
          if (result) {
            console.log('qqqqqqqqqqqq');
            
            console.log(result);
            
            cloudinaryUrls.push(result.secure_url);
          }
            req.body.cloudinaryUrl = cloudinaryUrls;
            next();
              }
      );
      uploadStream.end(file.buffer);
    } else if (req.files) {
      const files: CloudinaryFile[] = req.files as CloudinaryFile[];
      for (const file of files) {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'GramHive-Project', 
          } as any,
          (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (err) {
              console.error('Cloudinary upload error:', err);
              return next(err);
            }
            if (result) {
              cloudinaryUrls.push(result.secure_url);
            }
            if (cloudinaryUrls.length === files.length) {
              req.body.cloudinaryUrls = cloudinaryUrls;
              next();
            }
          }
        );
        uploadStream.end(file.buffer);
      }
    } else {
      next(new Error('No files provided'));
    }
  } catch (error) {
    console.error('Error in uploadToCloudinary middleware:', error);
    next(error);
  }
};



export default uploadToCloudinary;
