import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = 'uploads/scans';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif).'));
  }
};

// Multer setup
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ✅ Middleware wrapper for single file with error handling
export const uploadSingleScanImage = (req, res, next) => {
  const uploadMiddleware = upload.single('scanImage');

  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors (like file too large)
      return res.status(400).json({ message: `Multer Error: ${err.message}` });
    } else if (err) {
      // General errors (like invalid file type)
      return res.status(400).json({ message: `Upload Error: ${err.message}` });
    }

    next();
  });
};
