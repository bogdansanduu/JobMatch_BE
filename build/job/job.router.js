"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const jobRouter = express_1.default.Router();
exports.jobRouter = jobRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.JOB_INV.JobController);
jobRouter.get('/all', (0, catchErrors_1.default)(controller.getAllJobs.bind(controller)));
jobRouter.get('/all-paginated', (0, catchErrors_1.default)(controller.getAllJobsPaginated.bind(controller)));
jobRouter.get('/all-company/:companyId', (0, catchErrors_1.default)(controller.getAllJobsByCompany.bind(controller)));
jobRouter.get('/:jobId', (0, catchErrors_1.default)(controller.getJobById.bind(controller)));
jobRouter.post('/', (0, catchErrors_1.default)(controller.createJob.bind(controller)));
jobRouter.delete('/:jobId', (0, catchErrors_1.default)(controller.removeJob.bind(controller)));
jobRouter.post('/recSys', (0, catchErrors_1.default)(controller.addRecSysJobs.bind(controller)));
//# sourceMappingURL=job.router.js.map