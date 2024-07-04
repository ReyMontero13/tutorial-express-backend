//server.ts
import express, { Request, Response } from "express";
import sequelize from "./config/database";
import User from "./model/User";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Sequelize with Express!");
});

/**
 CODE START HERE
*/
// User Routes begin
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

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
