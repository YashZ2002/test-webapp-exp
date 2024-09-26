import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv'; 
dotenv.config();

// Asynchronous function to connect to the database
const createConnection = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log('Database connected successfully'.bgGreen.bold); // Logconnection successful message
    return db;
  } catch (error) {
    console.log('Error while connecting with the database'.bgRed.bold); // Log connection error message
    throw error;
  }
};

// this part is for checking if the connection is successful for health checks
export const checkConnection = async () => {
  try {
    const db = await createConnection();
    await db.ping(); 
    await db.end(); 
    return true; 
  } catch (error) {
    console.log('Database connection failed:', error.message); 
    return false; 
  }
};

export default createConnection;
