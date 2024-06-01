import { PutObjectCommand, GetObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { StatusCodes } from 'http-status-codes';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { injectable } from 'inversify';

import { HttpException } from '../common/exceptions/http.exception';

const bucketRegion = process.env.BUCKET_REGION || 'test';
const bucketName = process.env.BUCKET_NAME || 'test';
const accessKey = process.env.ACCESS_KEY || 'test';
const secretAccessKey = process.env.SECRET_ACCESS_KEY || 'test';
const expiresIn = 3600;

@injectable()
export class S3DocumentService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
    });
    this.bucketName = bucketName;
  }

  async generatePreSignedPutUrl(fileKey: string, fileType: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      ContentType: fileType,
    });

    try {
      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (err) {
      console.error(err);
      throw new HttpException('Failed to generate pre-signed URL', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async generatePreSignedGetUrl(fileKey: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    try {
      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (err) {
      console.error(err);
      throw new HttpException('Failed to generate pre-signed URL', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  //TODO - Implement this method
  async generateShortPreSignedGetUrl(fileKey: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    try {
      return await getSignedUrl(this.s3Client, command, { expiresIn: 60 });
    } catch (err) {
      console.error(err);
      throw new HttpException('Failed to generate pre-signed URL', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteDocument(fileKey: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    try {
      return await this.s3Client.send(command);
    } catch (err) {
      console.error(err);
      throw new HttpException('Failed to delete document', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
