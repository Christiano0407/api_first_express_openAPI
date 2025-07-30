// === Logic Develop & Logic Business Database ===

import pool from "../db.js"; // = Package DB - pg =  

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM producto ORDER BY id_producto ASC`); 
    res.json(result.rows); 
  }catch(err) {
    console.error(`Error To Get all Products: ${err}`); 
    res.status(500).json({error: `Internal Error Server: 500`}); 
  }
}; 

export const getProductById = async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await pool.query(
      `SELECT * 
      FROM producto 
      WHERE id_producto = $1`, [id]
    ); 
    if(result.rows.length === 0) {
      return res.status(404).json({
        message: `Product Not found`
      }); 
    }
  }catch(err) {
    if (err) {
      console.error(`We have an error To 'Get' the Product to 'ID' ${err} `); 
    } else {
      res.status(500).json({message: `Internal Error Server: 500`}); 
    }
  }
}; 

// = Logic To create an Product To 'ID' = 
export const createProductNew = async(req, res) => {
  const (
    nombre_producto, 
    descripcion_corta, 
    precio_usd, 
    categoria, 
    stack_disponible, 
    sku, 
    fecha_lanzamiento, 
    activo, 
    marca, 
    peso_kg, 
    dimensiones_cm, 
    valoracion_promedio,
    num_valoraciones, 
    url_imagen
  ) = req.body; 

  try {
    const result = await pool.query(
      `INSERT INTO producto (
        nombre_producto, descripcion_corta, precio_usd, categoria, stock_disponible, sku, 
        fecha_lanzamiento, activo, marca, peso_kg, dimensiones_cm, valoracion_promedio,  num_valorizaciones, url_imagen
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
       RETURNING*`, 
       [
        nombre_producto, descripcion_corta, precio_usd, categoria, stock_disponible, sku, 
        fecha_lanzamiento, activo, marca, peso_kg, dimensiones_cm, num_valorizaciones, url_imagen
       ]
    ); 
    res.status(201).json(result.rows[0]); 
  }catch(err) {
    if(err) {
      console.error(`We have an Error to Create an New Product: ${err}`); 
    }
    res.status(500).json({
      message: `We have an Error in Server To create an New Product`
    })
  }

}; 