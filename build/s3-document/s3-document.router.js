"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3DocumentContainerModule = exports.s3DocumentRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const s3_document_service_1 = require("./s3-document.service");
const s3_document_controller_1 = require("./s3-document.controller");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const s3DocumentRouter = express_1.default.Router();
exports.s3DocumentRouter = s3DocumentRouter;
const container = new inversify_1.Container();
const s3DocumentContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentService).to(s3_document_service_1.S3DocumentService);
    bind(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentController).to(s3_document_controller_1.S3DocumentController);
});
exports.s3DocumentContainerModule = s3DocumentContainerModule;
container.load(s3DocumentContainerModule);
const controller = container.get(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentController);
s3DocumentRouter.post('/presigned-put-url', (0, catchErrors_1.default)(controller.generatePreSignedPutUrl.bind(controller)));
s3DocumentRouter.post('/presigned-get-url', (0, catchErrors_1.default)(controller.generatePreSignedGetUrl.bind(controller)));
s3DocumentRouter.post('/short-presigned-get-url', (0, catchErrors_1.default)(controller.generateShortPreSignedGetUrl.bind(controller)));
s3DocumentRouter.delete('/', (0, catchErrors_1.default)(controller.deleteDocument.bind(controller)));
//# sourceMappingURL=s3-document.router.js.map