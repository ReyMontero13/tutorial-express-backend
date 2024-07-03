import express from 'express';
import { Request, Response } from 'express';
import User from '../../src/models/User';


const router = express.Router();

router.get('/', async (req: Request, res: Response)=>{
    try{
        const users = await User.findAll();
        res.json(users);
    } catch(err){
        console.error('Error fetching users:', err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

export default router;