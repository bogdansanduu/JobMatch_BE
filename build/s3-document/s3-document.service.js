"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.S3DocumentService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const http_status_codes_1 = require("http-status-codes");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const inversify_1 = require("inversify");
const http_exception_1 = require("../common/exceptions/http.exception");
const bucketRegion = process.env.BUCKET_REGION || 'test';
const bucketName = process.env.BUCKET_NAME || 'test';
const accessKey = process.env.ACCESS_KEY || 'test';
const secretAccessKey = process.env.SECRET_ACCESS_KEY || 'test';
const expiresIn = 3600;
let S3DocumentService = class S3DocumentService {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: bucketRegion,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey,
            },
        });
        this.bucketName = bucketName;
    }
    generatePreSignedPutUrl(fileKey, fileType) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                ContentType: fileType,
            });
            try {
                return yield (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            }
            catch (err) {
                console.error(err);
                throw new http_exception_1.HttpException('Failed to generate pre-signed URL', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    generatePreSignedGetUrl(fileKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            });
            try {
                return yield (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            }
            catch (err) {
                console.error(err);
                throw new http_exception_1.HttpException('Failed to generate pre-signed URL', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    generateShortPreSignedGetUrl(fileKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            });
            try {
                return yield (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 60 });
            }
            catch (err) {
                console.error(err);
                throw new http_exception_1.HttpException('Failed to generate pre-signed URL', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteDocument(fileKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            });
            try {
                return yield this.s3Client.send(command);
            }
            catch (err) {
                console.error(err);
                throw new http_exception_1.HttpException('Failed to delete document', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
S3DocumentService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], S3DocumentService);
exports.S3DocumentService = S3DocumentService;
//# sourceMappingURL=s3-document.service.js.map