// ====== === TESTS: TESTS Unitarios - Controllers Data Validation === ======
import { createProductMock } from "../setup/testHelpers.js";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

// === Mocks (Jest | No Prims) | Replace our Original Data in PostgreSQL ===
// ⚠️ IMPORTANTE: El mock DEBE ir antes de cualquier import que use db.js
jest.mock("../../../src/db.js", () => {
  const mockedPool = {
    query: jest.fn(), 
    on: jest.fn(), 
    connect: jest.fn(), 
  }; 

  return {
    __esModule:true, // Important To ES modules
    default:mockedPool
  }
});  

import * as productsControllers from "../../../src/controllers/productsController.js"; 
import pool from "../../../src/db.js";
import { testPool, setupTestCreateDb, cleanTestDb, closeTestDb } from "../setup/testDB.js";

// = Reference To Mock + DB(pool) = 
//const mockedPool = jest.mocked(pool); 

describe("Products Controllers - Unit Test", () => {
  let mockReq, mockRes; 

  beforeEach(() => {
    mockReq = {
      params: {}, 
      query: {}, 
      body: {}
    }; 

    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }; 
    // = Clean Mocks For Security 
    jest.clearAllMocks(); 
  });

   // === Verification Test ===
  describe("Mock Verification", () => {
    test("Should have mocked pool correctly", () => {
      expect(pool).toBeDefined();
      expect(pool.query).toBeDefined();
      expect(jest.isMockFunction(pool.query)).toBe(true);
    });
  });


    // === Tests Controllers ===
  describe("getAllProducts", () => {
    test("Should be return all products successfully", async () => {
      const mockProduct = [
        { id_producto: 1, 
          nombre_producto: 'Laptop Test',
          descripcion_corta: 'Laptop para testing',
          precio_usd: 999.99,
          categoria: 'Electrónica',
          stock_disponible: 10,
          sku: 'TEST-LAP-001',
          fecha_lanzamiento: '2024-01-15',
          activo: true,
          marca: 'TestBrand',
          peso_kg: 2.5,
          dimensiones_cm: '35x25x2',
          valoracion_promedio: 4.5,
          num_valoraciones: 50,
          url_imagen: 'https://test.com/image.jpg',
        }, 
        { id_producto: 2, 
          nombre_producto: 'Mac Pro',
          descripcion_corta: 'Laptop para testing',
          precio_usd: 2000.00,
          categoria: 'Electrónica',
          stock_disponible: 20,
          sku: 'TEST-LAP-002',
          fecha_lanzamiento: '2024-02-10',
          activo: true,
          marca: 'TestBrandMac',
          peso_kg: 2.0,
          dimensiones_cm: '35x25x2',
          valoracion_promedio: 4.5,
          num_valoraciones: 60,
          url_imagen: 'https://test.com/image_mac.jpg',
        }
      ]; 

      pool.query.mockResolvedValue({ rows: mockProduct }); 

      await productsControllers.getAllProductsPlus(mockReq, mockRes);
      
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM producto ORDER BY id_producto ASC`
      ); 

      expect(mockRes.json).toHaveBeenCalledWith(mockProduct); 
      }); 
    }); 

}); 