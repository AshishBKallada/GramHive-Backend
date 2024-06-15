import multer from 'multer';

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).array('files', 10); 

export default upload;
