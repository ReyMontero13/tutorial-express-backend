import express, {NextFunction, Request,Response} from 'express';
//import sequelize from 'sequelize';
//import User from './models/user';
import sequelize from './config/database'
import cors from 'cors'; //Import cors middleware
import routes from './routes'


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies 
app.use(express.json()); //Parse JSON bodies
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(cors()); //Enable CORS for all routes

//CORS Middleware 
app.use((req: Request,res: Response, next: NextFunction)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, POST ,PUT, PATCH , DELETE');
        return res.status(200).json({});
    }
    next();
})

// Use the routes defined in routes/index.ts
app.use('/',routes);


//Sample route
// app.get('/',(req: Request,res:Response)=>{
//     res.send('Hello, Express!');
// });

// Example route using Sequelize
// app.get('/users', async (req: Request, res: Response)=>{
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch(err){
//         console.error('Error fetching users:', err);
//         res.status(500).json({error:'internal Server Error'});
//     }
// });
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////



//Start the server 
// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    });
});
