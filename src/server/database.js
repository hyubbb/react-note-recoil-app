import dotenv from "dotenv";
import mariadb from "mariadb";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const pool = mariadb.createPool(dbConfig);

export default pool;
