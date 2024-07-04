//server.ts
import express, { Request, Response } from 'express';
import sequelize from './config/database';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Sequelize with Express!');
});

/**
 CODE START HERE
*/





// Sync Sequelize models with database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
