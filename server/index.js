import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

// Express app initialization
const app = express();

// some libraries integrated to app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// port on which the app will run
const port = process.env.PORT || 5000;

// imported all routers
app.use("/", routes);

// mongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected...");

    // starting the app
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
