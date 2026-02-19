import { S3 } from '@aws-sdk/client-s3';
import config from '../config.js';

const s3Client = new S3({
  endpoint: config.spaceBucket.spaceEndpoint,
  region: config.spaceBucket.spaceRegion,
  forcePathStyle: config.spaceBucket.forcePathStyle,
  credentials: {
    accessKeyId: config.spaceBucket.spaceAccessKeyId,
    secretAccessKey: config.spaceBucket.spaceSecretAccessKey,
  },
});

export default s3Client;
