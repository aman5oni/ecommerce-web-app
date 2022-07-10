import mongoose from "mongoose"
import { MONGO_URL } from "./appConfig"

const dbConnection = async () => {
    try {
      const { connection } = await mongoose.connect(MONGO_URL,)
      console.log(
        `Database connected for ${connection.name} : ${connection.host}`
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

export { dbConnection }