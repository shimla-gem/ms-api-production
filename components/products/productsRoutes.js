const express = require('express');
const productRoutes = express.Router();
const productController = require('./productsController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
productRoutes.post('/product', productController.createProduct);
productRoutes.post('/products/filters', productController.fetchFilterProduct);

productRoutes.get('/products', productController.getProducts);

productRoutes.get('/product/:productId',  productController.getProduct); 
 
productRoutes.put('/product/:productId', allowIfLoggedin, grantAccess('updateAny', 'profile'), productController.updateProduct);
 
productRoutes.delete('/product/:productId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), productController.deleteProduct);
 
module.exports = productRoutes;