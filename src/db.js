// === Call | Configure & connections To DataBase (Product) of PostgresSQL ===
import pg from "pg"; // = Import Pack pg =
const { Pool } = pg; // = Destructure the Class Pool To Pack 'pg' =

// = DB | env =
const pool = new Pool ({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}); 
// = Error =
pool.on(`error`, (err) => {
  if(err) {
    console.log(`We have an Error To connect & configure DB: ${err}`);
  } else {
    process.emit(-1); // === Exit To APP For Critic Errors ===
  }
}); 

// === Export pool to Use in different Modules ===
export default pool; 