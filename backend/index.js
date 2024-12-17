import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDb } from './database/db.js';
import cloudinary from 'cloudinary';
import userRoutes from './routes/userRoutes.js';
import receipeRoutes from './routes/receipeRoutes.js';

dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// routes
app.use('/api/user',userRoutes);
app.use('/api/receipe',receipeRoutes);

app.listen(PORT,()=>{
    console.log(`Server Listening on Port no. ${PORT} http://localhost:${PORT}`);
    connectDb();
})