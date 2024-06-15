import multer from "multer";
const storage = multer.memoryStorage();

const upload =multer({storage: storage});

const multeradUploadMiddleware = upload.any();
export default multeradUploadMiddleware;
