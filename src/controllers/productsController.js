// === Logic Develop & Logic Business Database ===
import pool from "../db.js"; // = Package DB - pg =

// === Validation Data Products === //
export const validationDataProduct = (data, isUpdate = false) => {
  
  const errors = {}; 
  
  if(!isUpdate) {
    if(!data.nombre_producto || typeof data.nombre_producto !== `string`) {
      errors.nombre_producto = `Error! Required the name. Please, the name is required to Get Product.`; 
    }
    if(!data.precio_usd || typeof data.precio_usd !== `number` || data.precio_usd <= 0) {
      errors.precio_usd = `Error! The price is required and must be a positive number`; 
    }
    if(!data.sku || typeof data.sku !== `string`) {
      errors.sku = `We have an Error. Please, add the "sku" to identify the Product`; 
    }
    if(!data.categoria || typeof data.categoria !== `string`) {
      errors.categoria = `Error To Get Categoria. Required the Categoria`; 
    }
    if(data.stock_disponible === undefined || typeof data.stock_disponible !== `number` && data.stock_disponible < 0) {
      errors.stock_disponible = `Error! Required the Stock & Sorry, the Stock is Empty`; 
    }
  }
  return errors; 
}; 

// === Methods Data Products === //
export const getAllProductsPlus = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM producto ORDER BY id_producto ASC`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(`Error To Get all Products: ${err}`);
    res.status(500).json({ error: `Internal Error Server: 500` });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {categoria, activo, limit=10, offset=0} = req.query; 
  
    let query = `SELECT * FROM producto`; // = SQL - Postgres =  
    const queryParams = []; 
    let paramsCount = 0; 

    // === Filters ===
    
    if(categoria) {
      paramsCount++; 
      query += `AND categoria = $${paramsCount}`; 
      queryParams.push(categoria); 
    }

    if(activo === undefined) {
      paramsCount++; 
      query += `AND activo = $${paramsCount}`; 
      queryParams.push(activo === true); 
    }
    
    // = Add Pagination = 
    query += `ORDER BY id_producto ASC`;

    paramsCount++; 
    query += `LIMIT $${paramsCount}`; 
    queryParams.push(parseInt(limit));  

    paramsCount++; 
    query += `offset $${paramsCount}`; 
    query.push(parseInt(offset)); 

    // === ADD Query | Get Total Count For Metadata ===

    let countQuery = `SELECT COUNT(*) FROM producto`;
    const queryParamsCount = [];
    let ParamsCountQuery = 0;  

    if(categoria) {
      ParamsCountQuery++; 
      countQuery += `AND categoria $${queryParamsCount}`; 
      queryParamsCount.push(categoria); 
    }

    if(activo === undefined) {
      ParamsCountQuery++;
      countQuery += `AND activo $${ParamsCountQuery}`; 
      queryParamsCount.push(activo === true); 
    }

    // === Promise ===
    const [result, countResult] = await Promise.all([
      pool.query(query, paramsCount),
      pool.query(countQuery, ParamsCountQuery)
    ]);

    res.status(200).json({
      data: result.rows,
      meta: {
        total: parseInt(countResult.rows[0].count()),
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    }); 

  }catch(err) {
    console.error(`Error To Get Products: ${err}`); 
    res.status(500).json({
      message: `Internal Server Error`, 
      error: err.message
    }); 
  }

}; 

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * 
      FROM producto 
      WHERE id_producto = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Product Not found`,
      });
    }
  } catch (err) {
    if (err) {
      console.error(`We have an error To 'Get' the Product to 'ID' ${err} `);
    } else {
      res.status(500).json({ message: `Internal Error Server: 500` });
    }
  }
};

// = Logic To create an Product To 'ID' =
export const createProductNew = async (req, res) => {
  const {
    nombre_producto,
    descripcion_corta,
    precio_usd,
    categoria,
    stock_disponible,
    sku,
    fecha_lanzamiento,
    activo,
    marca,
    peso_kg,
    dimensiones_cm,
    valoracion_promedio,
    num_valoraciones,
    url_imagen,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO producto (
        nombre_producto, descripcion_corta, precio_usd, categoria, stock_disponible, sku, 
        fecha_lanzamiento, activo, marca, peso_kg, dimensiones_cm, valoracion_promedio,  num_valorizaciones, url_imagen
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING*`,
      [
        nombre_producto,
        descripcion_corta,
        precio_usd,
        categoria,
        stock_disponible,
        sku,
        fecha_lanzamiento,
        activo,
        marca,
        peso_kg,
        dimensiones_cm,
        valoracion_promedio,
        num_valoraciones,
        url_imagen,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err) {
      console.error(`We have an Error to Create an New Product: ${err}`);
    }
    res.status(500).json({
      message: `We have an Error in Server To create an New Product`,
    });
  }
};
