import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getEnvVar } from '../utils/envConfig';

const bucketRegion = getEnvVar<string>('BUCKET_REGION', 'string');
const bucketName = getEnvVar<string>('BUCKET_NAME', 'string');
const accessKey = getEnvVar<string>('ACCESS_KEY', 'string');
const secretAccessKey = getEnvVar<string>('SECRET_ACCESS_KEY', 'string');

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

export const uploadFile = async (file: any) => {
  const uploadParams: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    console.error(error);
  }
};

export default s3;
