import multer from "multer";
const storage = multer.memoryStorage();

const upload =multer({storage: storage});

const storyUploadMiddleware = upload.single('story');
export default storyUploadMiddleware;
