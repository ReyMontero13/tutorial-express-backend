//server.ts
import express, { Request, Response, NextFunction} from "express";
import sequelize from "./config/database";
import User from "./model/User";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Sequelize with Express!");
});

/**
 CODE START HERE
*/
// User Routes begin
app.post("/sign_up", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});



// Fetch all users or find a specific user (for login)
app.get("/users", async (req: Request, res: Response) => {
  try {
    if (req.query.email && req.query.password) {
      // If email and password are provided, attempt to find user for login
      const { email, password } = req.query;
      const user = await User.findOne({ where: { email, password } });

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      // Otherwise, fetch all users (this might be for administrative purposes)
      const users = await User.findAll();
      res.json(users);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// });

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
//User Routes end



// Sync Sequelize models with database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
