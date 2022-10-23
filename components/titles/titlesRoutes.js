const express = require('express');
const titlesRoute = express.Router();
const titlesController = require('./titlesController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
titlesRoute.post('/titles', titlesController.createTitles);

titlesRoute.get('/titles', titlesController.getTitles);

titlesRoute.get('/titles/:titlesId', allowIfLoggedin, titlesController.getSingleTitles); 
 
// titlesRoute.put('/titles/:titlesId', allowIfLoggedin, grantAccess('updateAny', 'profile'), titlesController.updateTitles);
 
// titlesRoute.delete('/titles/:titlesId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), titlesController.deleteTitles);
 
titlesRoute.put('/titles/:titlesId',   titlesController.updateTitles);
 
titlesRoute.delete('/titles/:titlesId',   titlesController.deleteTitles);
 
module.exports = titlesRoute;