const express = require('express');
const router = express.Router();
const product_Controller = require("../Controllers/product_Controller");

// Endpoints para productos
router.get('/', product_Controller.getAllInventory);
router.post('/', product_Controller.postProduct);
router.delete('/:id', product_Controller.deleteProducto);
router.put('/:id', product_Controller.updateProducto);



module.exports = router;