const express = require('express');
const semiPreciousRoute = express.Router();
const semiPreciousController = require('./semiPreciousController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
semiPreciousRoute.post('/semi-precious', semiPreciousController.createSemiPrecious);

semiPreciousRoute.get('/semi-precious', semiPreciousController.getSemiPrecious);

semiPreciousRoute.get('/semi-precious/:semiPreciousId', allowIfLoggedin, semiPreciousController.getSingleSemiPrecious); 
 
semiPreciousRoute.put('/semi-precious/:semiPreciousId', allowIfLoggedin, grantAccess('updateAny', 'profile'), semiPreciousController.updateSemiPrecious);
 
semiPreciousRoute.delete('/semi-precious/:semiPreciousId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), semiPreciousController.deleteSemiPrecious);
 
module.exports = semiPreciousRoute;