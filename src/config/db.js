import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully'.bgGreen.bold);
    return true;
  } catch (error) {
    console.log('Error while connecting to the database'.bgRed.bold);
    console.log(error);
    return false;
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log('Database tables created successfully'.bgGreen.bold);
  } catch (error) {
    console.log('Error creating database tables'.bgRed.bold);
    console.log(error);
  }
};

syncDatabase();

export default sequelize;