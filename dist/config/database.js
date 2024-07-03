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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const initDatabase_1 = __importDefault(require("./initDatabase"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'expressdb', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'rey13', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // disable logging SQL queries to the console
});
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, initDatabase_1.default)();
            yield sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error.message);
        }
    });
}
initializeDatabase().catch((error) => {
    console.error('Initialization error:', error.message);
});
exports.default = sequelize;
