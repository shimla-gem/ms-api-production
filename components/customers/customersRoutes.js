const express = require('express');
const customersRoutes = express.Router();
const customersController = require('./customersController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
customersRoutes.post('/customer', customersController.createCustomers);

customersRoutes.get('/customers', customersController.getCustomers);
customersRoutes.put('/customersUp', customersController.updateStatusALl); // devlopment purpose

customersRoutes.get('/customer/:customersId', allowIfLoggedin, customersController.getCustomers); 
 
customersRoutes.put('/customer/:customersId', allowIfLoggedin, grantAccess('updateAny', 'profile'), customersController.updateCustomers);
 
customersRoutes.delete('/customer/:customersId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), customersController.deleteCustomers);
 
module.exports = customersRoutes;