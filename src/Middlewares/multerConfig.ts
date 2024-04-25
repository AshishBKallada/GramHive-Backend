import multer from 'multer';

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).array('images', 10); 

export default upload;
