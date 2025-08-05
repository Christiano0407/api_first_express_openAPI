// ====== === TESTS: TESTS Unitarios - Validation (Validación) === ======
import { describe, expect, test } from "@jest/globals";
import { validationDataProduct } from "../../../src/controllers/productsController";

describe(`Product Validation`, () => {
  describe(`validationDataProducts - Create Mode New`, () => {

    test(`Don't Be Return Error! Because, receives Products (Validation)`, () => {
      const validationData = {
        nombre_producto: 'Laptop Test',
        precio_usd: 999.99,
        categoria: 'Electrónica',
        stock_disponible: 10,
        sku: 'TEST-LAP-001',
      }
      const errorsValidationProducts = validationDataProduct(validationData, false); 
      expect(Object.keys(errorsValidationProducts)).toHaveLength(0); 
    
    }); 

    test(`Error! Required the name. Please, the name is required to Get Product.`, () => {
      const validationName = {
        precio_usd: 999.99,
        categoria: 'Electrónica',
        stock_disponible: 10,
        sku: 'TEST-LAP-001',
      }
      const errorProductName = validationDataProduct(validationName, false);
      expect(errorProductName.nombre_producto).toBeDefined(); 
      expect(errorProductName.nombre_producto).toContain(`String`); 

    }); 

    test(`Error! The price is required and must be a positive number`, () => {
      const validationPrice = {
        nombre_producto: 'Laptop Test',
        precio_usd: -100, // = Negative Price =
        categoria: 'Electrónica',
        stock_disponible: 10,
        sku: 'TEST-LAP-001',
      }
      const errorPriceValid = validationDataProduct(validationPrice, false); 
      expect(errorPriceValid.precio_usd).toBeDefined(); 
      expect(errorPriceValid.precio_usd).toContain(`A number | Must be positive Number > 0`);  
    }); 

    test(`We have an Error. Please, add the "sku" to identify the Product`, () => {
      const validationSKU = {
        nombre_producto: 'Laptop Test',
        precio_usd: 999.99,
        categoria: 'Electrónica',
        stock_disponible: 10, 
      }
      const errorSKUValid = validationDataProduct(validationSKU, false); 
      expect(errorSKUValid.sku).toBeDefined(); 
      expect(errorSKUValid.sku).toContain(`string`); 
    }); 

    test( `Error To Get Categoria. Required the Categoria`, () => {
      const validationCategory = {
        nombre_producto: 'Laptop Test',
        precio_usd: 999.99,
        stock_disponible: 10, 
      }
      const errorCategory = validationDataProduct(validationCategory, false); 
      expect(errorCategory.categoria).toBeDefined(); 
      expect(errorCategory.categoria).toContain(`string`); 
    }); 

    test(`Error! Required the Stock & Sorry, the Stock is Empty`, () => {
      const validationStock = {
        nombre_producto: 'Laptop Test',
        precio_usd: 999.99,
        categoria: 'Electrónica',
        sku: 'TEST-LAP-001',
      }
      const errorStock = validationDataProduct(validationStock, false); 
      expect(errorStock.stock_disponible).toBeDefined(); 
      expect(errorStock.stock_disponible).toContain(`A Positive Number and not is empty`); 
    }); 

    test(`Don't be return minimum to the Products`, () => {
      const validationMinimum = {
        nombre_producto: 'Laptop Test',
      }
      const errorMinimum = validationDataProduct(validationMinimum, false); 
      expect(Object.keys(errorMinimum)).toHaveLength(0); 
    }); 
  
  })
}); 