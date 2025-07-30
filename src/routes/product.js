// === Define Routes To API From Products (Modules) ===
import express from "express"; 
import * as controllersProduct from "../controllers/productsController"; 
const router = express.Router(); // = Create an router in Express =

// === Root - Router ===
// = GET = 
router.get(`/`, controllersProduct.getAllProducts); 
router.get(`/:id`, controllersProduct.getProductById); 
// = POST =
router.post(`/`, controllersProduct.createProductNew); 

export default router; 