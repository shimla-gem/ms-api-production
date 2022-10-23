const express = require('express');
const tripRoutes = express.Router();
const tripController = require('./tripController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
tripRoutes.post('/trip', tripController.createTrip);

tripRoutes.get('/trips', tripController.getTrips);

tripRoutes.get('/trip/:tripId', allowIfLoggedin, tripController.getSingleTrip); 
 
tripRoutes.put('/trip/:tripId', tripController.updateTrip);
 
tripRoutes.delete('/trip/:tripId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), tripController.deleteTrip);
 
module.exports = tripRoutes;