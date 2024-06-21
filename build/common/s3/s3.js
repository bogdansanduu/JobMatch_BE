"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const envConfig_1 = require("../utils/envConfig");
const bucketRegion = (0, envConfig_1.getEnvVar)('BUCKET_REGION', 'string');
const bucketName = (0, envConfig_1.getEnvVar)('BUCKET_NAME', 'string');
const accessKey = (0, envConfig_1.getEnvVar)('ACCESS_KEY', 'string');
const secretAccessKey = (0, envConfig_1.getEnvVar)('SECRET_ACCESS_KEY', 'string');
const s3 = new client_s3_1.S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadParams = {
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        yield s3.send(new client_s3_1.PutObjectCommand(uploadParams));
    }
    catch (error) {
        console.error(error);
    }
});
exports.uploadFile = uploadFile;
exports.default = s3;
//# sourceMappingURL=s3.js.map