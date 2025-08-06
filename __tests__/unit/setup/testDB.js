// === Tests testDB | .env.test ===
import pg from "pg"; // = Import Package pg =
import dotenv from "dotenv";  

dotenv.config({ path: ".env.test" }); // .env.test 

const { Pool } = pg; 

export const testPool = new Pool({
  user: process.env.DB_USER_TEST, // - DB_USER - [.env]
  host: process.env.DB_HOST_TEST, // - DB_HOST - 
  database: process.env.DB_NAME_TEST, // - DB_NAME -
  password: process.env.DB_PASSWORD_TEST, // - DB_PASSWORD -
  port: process.env.DB_PORT_TEST, // - DB_PORT -
}); 

export const setupTestCreateDb = async () => {
  await testPool.query(`  
    CREATE TABLE IF NOT EXISTS producto (
      id_producto SERIAL PRIMARY KEY,
      nombre_producto VARCHAR(255) NOT NULL,
      descripcion_corta TEXT,
      precio_usd DECIMAL(10,2) NOT NULL,
      categoria VARCHAR(100) NOT NULL,
      stock_disponible INTEGER NOT NULL DEFAULT 0,
      sku VARCHAR(50) UNIQUE NOT NULL,
      fecha_lanzamiento DATE,
      activo BOOLEAN DEFAULT true,
      marca VARCHAR(100),
      peso_kg DECIMAL(5,2),
      diversion's_cm VARCHAR(50),
      valoracion_promedio DECIMAL(3,2),
      num_valoraciones INTEGER DEFAULT 0,
      url_imagen string,
    )
  `); 
}; 

export const cleanTestDb = async () => {
   // 1. Borrar todos los registros
  await testPool.query(`DELETE FROM producto`); 
  // 2. Reiniciar la secuencia para que los IDs empiecen desde 1
  // NOTA: 'producto_id_producto_seq' es el nombre automático que PostgreSQL
  // asigna cuando usas SERIAL en la columna id_producto
  await testPool.query(`ALTER SEQUENCE producto_id_producto_seq RESTART WITH 1`); 
}; 

export const closeTestDb = async () => {
  await testPool.end();  
}; 