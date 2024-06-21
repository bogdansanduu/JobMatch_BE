"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3DocumentRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const s3DocumentRouter = express_1.default.Router();
exports.s3DocumentRouter = s3DocumentRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentController);
s3DocumentRouter.post('/presigned-put-url', (0, catchErrors_1.default)(controller.generatePreSignedPutUrl.bind(controller)));
s3DocumentRouter.post('/presigned-get-url', (0, catchErrors_1.default)(controller.generatePreSignedGetUrl.bind(controller)));
s3DocumentRouter.post('/short-presigned-get-url', (0, catchErrors_1.default)(controller.generateShortPreSignedGetUrl.bind(controller)));
s3DocumentRouter.delete('/', (0, catchErrors_1.default)(controller.deleteDocument.bind(controller)));
//# sourceMappingURL=s3-document.router.js.map