import express from "express";
import productRoute from "./routes/productRoutes";
import { errorMiddleware } from "./middleware/error";
import userRoute from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import orderRoute from "./routes/orderRoutes";

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());
app.use(express.json());

// All Routes
app.use(userRoute);
app.use(productRoute);
app.use(orderRoute);

// Middleware For Error
app.use(errorMiddleware);
export default app;
