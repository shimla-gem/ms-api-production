const express = require('express');
const brokersRoutes = express.Router();
const brokersController = require('./brokersController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
brokersRoutes.post('/broker', brokersController.createBrokers);

brokersRoutes.get('/brokers', brokersController.getBrokers);

brokersRoutes.get('/broker/:brokersId', allowIfLoggedin, brokersController.getSingleBrokers); 
 
brokersRoutes.put('/broker/:brokersId', allowIfLoggedin, grantAccess('updateAny', 'profile'), brokersController.updateBrokers);
 
brokersRoutes.delete('/broker/:brokersId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), brokersController.deleteBrokers);
 
module.exports = brokersRoutes;