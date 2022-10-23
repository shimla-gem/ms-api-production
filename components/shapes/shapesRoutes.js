const express = require('express');
const shapesRoute = express.Router();
const shapesController = require('./shapesController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
// shapesRoute.post('/shapes',allowIfLoggedin,grantAccess('updateAny', 'profile'), shapesController.createShapes);
shapesRoute.post('/shapes', shapesController.createShapes);

shapesRoute.get('/shapes', shapesController.getShapes);
// shapesRoute.get('/shapes',allowIfLoggedin,grantAccess('updateAny', 'profile'), shapesController.getShapes);

shapesRoute.get('/shapes/:shapesId', allowIfLoggedin, shapesController.getSingleShapes); 
 
shapesRoute.put('/shapes/:shapesId', allowIfLoggedin, grantAccess('updateAny', 'profile'), shapesController.updateShapes);
 
shapesRoute.delete('/shapes/:shapesId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), shapesController.deleteShapes);
 
module.exports = shapesRoute;