// ====== === TESTS: TESTS Unitarios - Controllers Data Validation === ======
import * as productsControllers from "../../../src/controllers/productsController.js"; 
import { testPool, setupTestCreateDb, cleanTestDb, closeTestDb } from "../setup/testDB.js";
import { createProductMock  } from "../setup/testHelpers.js"; 
import { beforeEach, describe, jest } from "@jest/globals";
import pool from "../../../src/db";

// === Mocks (Jest | No Prims) | Replace our Original Data in PostgreSQL ===
// = Default is 'default export' = 
jest.mock("../../../src/db.js", () => {
  default: {
    query: jest.fn()
  }
});  

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
      status: jest.fn().mockReturnThis()
    }; 

    jest.clearAllMocks(); 
  });

}); 

// === Tests Controllers ===