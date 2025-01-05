//server/utils/multer.js
import multer from 'multer';

// Disk storage configuration
const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadDisk = multer({
  storage: storageDisk,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Memory storage configuration
const storageMemory = multer.memoryStorage();

const uploadMemory = multer({
  storage: storageMemory,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export { uploadDisk, uploadMemory };
