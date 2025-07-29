import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/authRoutes.js';
import path from 'path';
import { connectDB } from './src/lib/db.js';

dotenv.config();

const app=express()
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB();
})
 