import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseName = process.env.DB_NAME || 'expressdb';
const config = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'rey13',
  port: Number(process.env.DB_PORT) || 5432,
};

async function createDatabase() {
  const client = new Client(config);
  try {
    await client.connect();
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname=$1', [databaseName]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created successfully.`);
    } else {
      console.log(`Database ${databaseName} already exists.`);
    }
  } catch (error:any) {
    console.error(`Error creating database: ${error.message}`);
  } finally {
    await client.end();
  }
}

export default createDatabase;
