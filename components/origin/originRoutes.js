const express = require('express');
const originRoutes = express.Router();
const originController = require('./originController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
originRoutes.post('/origin', originController.createOrigin);

originRoutes.get('/origins', originController.getOrigins);

originRoutes.get('/origin/:originId', allowIfLoggedin, originController.getOrigin); 
 
originRoutes.put('/origin/:originId', allowIfLoggedin, grantAccess('updateAny', 'profile'), originController.updateOrigin);
 
originRoutes.delete('/origin/:originId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), originController.deleteOrigin);
 
module.exports = originRoutes;