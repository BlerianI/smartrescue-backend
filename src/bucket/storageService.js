import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from './s3.js';
import config from '../config.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export async function uploadProfilePicture(fileBuffer, originalFilename, userId) {
  const fileExtension = path.extname(originalFilename).toLowerCase();

  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error('Nur PNG und JPG erlaubt');
  }

  const uniqueFilename = `avatar_user/${userId}/${uuidv4()}${fileExtension}`;
  const contentType = fileExtension === '.png' ? 'image/png' : 'image/jpeg';

  const command = new PutObjectCommand({
    Bucket: config.spaceBucket.bucketName,
    Key: uniqueFilename,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `${config.spaceBucket.spaceEndpoint}/${uniqueFilename}`;
}
