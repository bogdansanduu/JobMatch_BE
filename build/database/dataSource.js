"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const dotenv_1 = __importDefault(require("dotenv"));
const entities_1 = require("./entities");
const envConfig_1 = require("../common/utils/envConfig");
dotenv_1.default.config();
const DB_HOST = (0, envConfig_1.getEnvVar)('DB_HOST', 'string');
const DB_PORT = (0, envConfig_1.getEnvVar)('DB_PORT', 'number');
const DB_USER = (0, envConfig_1.getEnvVar)('DB_USER', 'string');
const DB_PASSWORD = (0, envConfig_1.getEnvVar)('DB_PASSWORD', 'string');
const DB_DATABASE = (0, envConfig_1.getEnvVar)('DB_DATABASE', 'string');
exports.dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    entities: entities_1.ENTITIES,
    migrations: [`${__dirname}/migrations/*.ts`],
    logging: false,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
console.log(__dirname);
//# sourceMappingURL=dataSource.js.map