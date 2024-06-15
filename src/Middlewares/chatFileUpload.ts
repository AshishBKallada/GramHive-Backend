const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
export const chatFileUpload = upload.array('files');
