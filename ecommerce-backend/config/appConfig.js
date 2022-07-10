import dotenv from "dotenv"
import { env } from "process"

dotenv.config()

const PORT = env.PORT
const MONGO_URL = env.MONGO_URL
export { PORT,MONGO_URL }