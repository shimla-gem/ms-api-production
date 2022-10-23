const express = require('express');
const preciousRoute = express.Router();
const preciousController = require('./preciousController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
preciousRoute.post('/precious', preciousController.createPrecious);

preciousRoute.get('/precious', preciousController.getPrecious);

preciousRoute.get('/precious/:preciousId', allowIfLoggedin, preciousController.getSinglePrecious); 
 
preciousRoute.put('/precious/:preciousId', allowIfLoggedin, grantAccess('updateAny', 'profile'), preciousController.updatePrecious);
 
preciousRoute.delete('/precious/:preciousId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), preciousController.deletePrecious);
 
module.exports = preciousRoute;