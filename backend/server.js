import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import ProductRoutes from "./routers/productRoutes.js";
import userRoutes from './routers/userRoutes.js';
import orderRoutes from "./routers/orderRoutes.js";
import uploadRoutes from "./routers/uploadRoutes.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Router has started');
})

app.use('/api/products',ProductRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// make uploads folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=>{
    console.log('Router has started at ' + PORT + "\nMode: " + process.env.NODE_ENV);
})


