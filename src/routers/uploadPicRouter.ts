import express, { Request, Response } from 'express';
import admin from '../services/firebase';
import multer, { FileFilterCallback } from 'multer';
import { file } from 'googleapis/build/src/apis/file';
import { uploadPic } from '@/controllers/uploadPicController';
import { getPics } from '@/controllers/uploadPicController';

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post('/:catagory/upload/:id', upload.single('file'), uploadPic);
router.get('/:catagory', getPics);

export default router;
