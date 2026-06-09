import express from "express";
import cors from "cors";
const app =express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>
{
  res.status(200).json("api is running");
})

connectDB().then(()=>
{
    console.log("connected to database");
    app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port ${process.env.PORT}`);
})
}).catch((error)=>
{
    console.error("database connection failed",error);
    process.exit(1);
});

