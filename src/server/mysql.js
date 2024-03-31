import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.error("Database connection failed: " + error.stack);
    return;
  }

  console.log("Connected to database.");
});

export default connection;
