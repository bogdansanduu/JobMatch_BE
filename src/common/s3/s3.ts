import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

const bucketRegion = process.env.BUCKET_REGION || 'test';
const bucketName = process.env.BUCKET_NAME || 'test';
const accessKey = process.env.ACCESS_KEY || 'test';
const secretAccessKey = process.env.SECRET_ACCESS_KEY || 'test';

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
