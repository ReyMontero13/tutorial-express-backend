import { Sequelize } from 'sequelize';
import createDatabase from './initDatabase';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'expressdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'rey13',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // disable logging SQL queries to the console
  }
);

async function initializeDatabase() {
  try {
    await createDatabase();
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error:any) {
    console.error('Unable to connect to the database:', error.message);
  }
}

initializeDatabase().catch((error) => {
  console.error('Initialization error:', error.message);
});

export default sequelize;
