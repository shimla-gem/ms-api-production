const express = require('express');
const suppliersRoutes = express.Router();
const suppliersController = require('./suppliersController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
suppliersRoutes.post('/supplier' ,suppliersController.createSuppliers);

suppliersRoutes.get('/suppliers' ,suppliersController.getSuppliers);

suppliersRoutes.get('/suppliers/:suppliersId', allowIfLoggedin, suppliersController.getSuppliers); 
 
suppliersRoutes.put('/suppliers/:suppliersId', allowIfLoggedin, grantAccess('updateAny', 'profile'), suppliersController.updateSuppliers);
 
suppliersRoutes.delete('/suppliers/:suppliersId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), suppliersController.deleteSuppliers);
 
module.exports = suppliersRoutes;