"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyInject = void 0;
const inversify_inject_decorators_1 = __importDefault(require("inversify-inject-decorators"));
const centralizedContainer_1 = require("./centralizedContainer");
const { lazyInject } = (0, inversify_inject_decorators_1.default)((0, centralizedContainer_1.getCentralizedContainer)());
exports.lazyInject = lazyInject;
//# sourceMappingURL=lazyInject.js.map