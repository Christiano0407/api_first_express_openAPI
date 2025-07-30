// === Logic Develop DataBase / Logic Business ===

import pool from "../db.js"; // = Package DB - pg =  

export const getAllProducts = async(req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM producto ORDER BY id_producto ASC`); 
    res.json(result.rows); 
  }catch(err) {
    console.error(`Error To Get all Products: ${err}`); 
    res.status(500).json({error: `Internal Error Server: 500`}); 
  }
}; 