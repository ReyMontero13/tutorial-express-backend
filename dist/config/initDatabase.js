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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseName = process.env.DB_NAME || 'expressdb';
const config = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'rey13',
    port: Number(process.env.DB_PORT) || 5432,
};
function createDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client(config);
        try {
            yield client.connect();
            const res = yield client.query('SELECT 1 FROM pg_database WHERE datname=$1', [databaseName]);
            if (res.rowCount === 0) {
                yield client.query(`CREATE DATABASE ${databaseName}`);
                console.log(`Database ${databaseName} created successfully.`);
            }
            else {
                console.log(`Database ${databaseName} already exists.`);
            }
        }
        catch (error) {
            console.error(`Error creating database: ${error.message}`);
        }
        finally {
            yield client.end();
        }
    });
}
exports.default = createDatabase;
