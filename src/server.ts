import express, { NextFunction, Request, Response } from "express";
//import sequelize from 'sequelize';
//import User from './models/user';
<<<<<<< HEAD
import sequelize from "./config/database";
import cors from "cors"; //Import cors middleware
import routes from "./routes";
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";
=======
import sequelize from './config/database'
import cors from 'cors'; //Import cors middleware
import routes from './routes'

>>>>>>> parent of 9935429 (Add Comment)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json()); //Parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors()); //Enable CORS for all routes

<<<<<<< HEAD
//CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST ,PUT, PATCH , DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// Welcome routes , will soon to be separated to routes/welcome.ts
// app.get('/',(req: Request , res: Response) =>{
//     res.send('Hello, sequelize with Express!');
// });
=======
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
>>>>>>> parent of 9935429 (Add Comment)

// Use the routes defined in routes/index.ts
app.use("/", routes);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------//

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

<<<<<<< HEAD
// Example routes
app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  const user = await User.create({ username, email });
  res.status(201).json(user);
});
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});


// Example route to create a post for a user
app.post("/users/:userId/posts", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, content, comments } = req.body;

  try {
    // create post associated with user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.create({ title, content });
    await user.addPost(post);

    //Create comments associated with the post
    if (comments && comments.length > 0) {
      await Promise.all(
        comments.map(async (commentData: { content: string }) => {
          const comment = await Comment.create(
            { content: commentData.content },
            {}
          );
          await comment.setUser(user, {});
          await comment.setPost(post, {});
        })
      );
    }

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////s

//Start the server
=======


//Start the server 
>>>>>>> parent of 9935429 (Add Comment)
// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
