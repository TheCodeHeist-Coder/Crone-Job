import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv()
// import "./schedular01.js"
// import "./schedular02.js"
import "./schedular03.js"

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());


app.listen(PORT, () => {
    console.log("Srvr is still alive")
})