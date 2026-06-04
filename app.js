import express from "express";

// Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

// Middleware
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

// Database 
import connectToDatabase from "./database/mongodb.js";

// Port
import { PORT, NODE_ENV } from "./config/env.js";



const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API!");
});

app.listen(PORT, async () => {
  console.log(`Subscription tracker is running on port ${PORT}`);
  await connectToDatabase();
});


export default app;
