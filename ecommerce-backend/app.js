import express from "express";
import productRoute from "./routes/productRoute";
import { errorMiddleware } from "./middleware/error";

const app = express();
app.use(express.json());
app.use(productRoute);

// Middleware For Error
app.use(errorMiddleware)
export default app;
