import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import "dotenv/config";

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB Connected...");
    app.listen(port, () => {
        console.log(`Listeing on port ${port}`);
    })
}).catch(err => {
    console.log(err);
    process.exit(1);
})
