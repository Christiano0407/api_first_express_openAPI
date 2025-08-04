// ====== === TESTS: TESTS Unitarios - Validation (Validación) === ======
import { describe, expect, test } from "@jest/globals";
import { validationDataProduct } from "../../../src/controllers/productsController";

describe(`Product Validation`, () => {
  describe(`validationDataProducts - Create Mode New`, () => {

    test(`validation Exist Data | Not Should be Return Errors`, () => {
      const validationData = {
        nombre_producto: 'Laptop Test',
        precio_usd: 999.99,
        categoria: 'Electrónica',
        stock_disponible: 10,
        sku: 'TEST-LAP-001',
      }
      const errorsValid = validationDataProduct(validationData, false); 
      expect(Object.keys(errorsValid)).toHaveLength(0); 
    
    }); 
  
  })
}); 