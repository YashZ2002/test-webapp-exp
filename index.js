import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors'; 
import connection from './src/config/db.js';
import healthzRoute from './src/routes/healthz.js'; 

// Loading environment variables from .env file of my project
dotenv.config();
const app = express();

// this is CORS configuration
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'PUT','HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json()); //  parsing JSON requests
app.use(morgan('dev')); // HTTP request logger


app.use('/api', healthzRoute); // Routeing for health check and names

// Catching all route for 404 Not Found if no routes match
app.use((req, res) => {
  res.status(404).send(); 
});

// this part is trying to Connect to the database and start the server
const PORT = process.env.PORT || 5003;
connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.green.bold); 
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error.message.red.bold);
  });
