// === Tests testDB | .env.test ===
import pg from "pg"; // = Import Package pg =
import dotenv from "dotenv";  

dotenv.config({ path: ".env.test" }); // .env.test 

const { Pool } = pg; 

export const testPool = new Pool({
  user: process.env.DB_USER_TEST, // - DB_USER - [.env]
  host: process.env.DB_HOST_TEST, // - DB_HOST - 
  name: process.env.DB_NAME_TEST, // - DB_NAME -
  password: process.env.DB_PASSWORD_TEST, // - DB_PASSWORD -
  port: process.env.DB_PORT_TEST, // - DB_PORT -
}); 