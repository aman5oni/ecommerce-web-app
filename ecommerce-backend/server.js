import app from "./app"
import { PORT } from "./config/appConfig"
import { dbConnection } from "./config/dataBase"

dbConnection()
app.listen(PORT,()=>{
    console.log(`Listening to Port: ${PORT}`)
})