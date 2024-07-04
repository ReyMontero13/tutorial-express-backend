import express from 'express';
import userRoutes from './userRoutes'
import welcomeRoutes from './welcomeRoutes'

const router = express.Router();

router.use('/',welcomeRoutes);
router.use('/users',userRoutes);

export default router;