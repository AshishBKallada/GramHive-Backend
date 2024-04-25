import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadSingle = upload.single('image');

const processUpload = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    
  uploadSingle(req, res, (err: MulterError) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export default processUpload;
