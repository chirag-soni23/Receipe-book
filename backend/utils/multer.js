import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({storage}).single("image");

export default upload;