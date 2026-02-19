import express from 'express';
import multer from 'multer';
import { getTest, uploadAvatar } from './userController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Nur PNG/JPG'));
  },
});

router.get('/', getTest);
router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);

export default router;
