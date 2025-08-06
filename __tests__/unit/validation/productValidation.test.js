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
      expect(errorPriceValid.precio_usd).toContain(`number`);  
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
    }); 

    test( `Error To Get Categoria. Required the Categoria`, () => {
      const validationCategory = {
        nombre_producto: 'Laptop Test',
        precio_usd: 999.99,
        stock_disponible: 10, 
      }
      const errorCategory = validationDataProduct(validationCategory, false); 
      expect(errorCategory.categoria).toBeDefined(); 
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
    }); 
  })
}); 

describe(`validationDataProduct Update Mode`, () => {
   test(`Should Be Return Error! Because, Update mode with minimum data`, () => {
      const validationMinimum = {
        precio_usd: 899.00
      }
      const errorMinimum = validationDataProduct(validationMinimum, true); 
      expect(Object.keys(errorMinimum)).toHaveLength(0); 
    }); 
}); 