import multer from 'multer';

const storage = multer.memoryStorage();
const Audioupload = multer({ storage: storage }).single('wavfile');

export default Audioupload;
