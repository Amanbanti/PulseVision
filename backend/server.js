import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import patientRoutes from "./routes/patientRoutes.js"
// Load environment variables from .env file
dotenv.config();

const app = express();


const port = process.env.PORT || 5000;

// Allow frontend to talk to backend
app.use(cors({
  origin: [
    'http://localhost:3000',              // for local development
    'https://pulse-vision-mu.vercel.app'  // for deployed frontend
  ],
  credentials: true,
}));


// Connect to the MongoDB database
const startServer = async () => {
  try {
    await connectDB();  
    console.log('Connected to MongoDB successfully');

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);  // Exit process with failure if connection fails
  }
};

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));



app.use('/api/users', userRoute);
app.use("/api/patients", patientRoutes);



const __dirname = path.resolve();// set __dirname to current directory


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}else{
      app.get('/', (req, res) => {
        res.send('API is Running...');
      });
  
}


// Error handling middleware
app.use(notFound);  // Handle 404 errors
app.use(errorHandler);  // Custom error handler


startServer();
