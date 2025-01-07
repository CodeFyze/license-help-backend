import express, { Request, Response } from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';  
import connectDB from './config/databse';
import authRoutes from './routes/authRoutes';
import bookingRoutes from "./routes/bookingRoutes"
// import userRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






