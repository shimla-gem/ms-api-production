const express = require('express');
const storageRoutes = express.Router();
const storagesController = require('./storageController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
storageRoutes.post('/storages', storagesController.createStorages);

storageRoutes.get('/storages', storagesController.getStorages);
// storageRoutes.put('/storagesUp', storagesController.updateStatusALl); // devlopment purpose

storageRoutes.get('/storage/:storagesId', allowIfLoggedin, storagesController.getSingleStorages); 
 
storageRoutes.put('/storage/:storagesId', allowIfLoggedin, grantAccess('updateAny', 'profile'), storagesController.updateStorages);
 
storageRoutes.delete('/storage/:storagesId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), storagesController.deleteStorages);
 
module.exports = storageRoutes;