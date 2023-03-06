import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config(); 

const app = express();


app.use(cors({
  origin: true,
  credentials: true
}));

try {
  await db.authenticate();
  console.log("Database connected");
} catch (error) {
  console.error("Error connecting to the database: ", error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server is running on port 5000"));
