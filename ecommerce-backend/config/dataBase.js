import mongoose from "mongoose";
import { MONGO_URL } from "./appConfig";

const dbConnection = async () => {
  const { connection } = await mongoose.connect(MONGO_URL);
  console.log(`Database connected for ${connection.name} : ${connection.host}`);
};

export { dbConnection };
