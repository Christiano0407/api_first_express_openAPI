// === Functions and Data to prove Data | jest | Fabric Cases Of prove with Data ===
// = Validation Data From Testing = 
// = ...overrides // Permite sobrescribir propiedades específicas = 

export const createProductMock = (overrides = {}) => ({
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
}); 

// = Create different Products =
export const createMultipleProducts = (count = 3) => {
  return Array.from({ length: count }, (_, index) => 
    createProductMock({
      nombre_producto: `Producto Test ${index + 1}`,
      sku: `TEST-PROD-${String(index + 1).padStart(3, '0')}`,
      precio_usd: 100 + (index * 50)
    })
  );
}; 

// = Create Invalid Product To Invalid test | Crear Producto Inválido para tests de Validación  =
export const createInvalidProduct = (missingField) => {
  const validationProduct = createProductMock(); 
  delete validationProduct[missingField]; 
  return validationProduct; 
}; 

// = Helper: Datos para tests de Error = 
export const getInvalidDataError = () => ({
  priceNegative: createProductMock({precio_usd: -100}),
  stockNegative: createProductMock({stock_disponible: -5}),
  emptyName: createProductMock({nombre_producto: ""}),
  invalidType: createProductMock({precio_usd: "not-a-number"}),
}); 