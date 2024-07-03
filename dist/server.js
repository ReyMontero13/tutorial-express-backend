"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import sequelize from 'sequelize';
//import User from './models/user';
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors")); //Import cors middleware
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies 
app.use(express_1.default.json()); //Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use((0, cors_1.default)()); //Enable CORS for all routes
//CORS Middleware 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST ,PUT, PATCH , DELETE');
        return res.status(200).json({});
    }
    next();
});
// Use the routes defined in routes/index.ts
app.use('/', routes_1.default);
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
database_1.default.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
