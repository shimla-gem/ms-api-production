const express = require('express');
const banksRoutes = express.Router();
const banksController = require('./banksController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
banksRoutes.post('/bank', banksController.createBanks);

banksRoutes.get('/banks', banksController.getBanks);
// banksRoutes.put('/banksUp', banksController.updateStatusALl); // devlopment purpose

banksRoutes.get('/bank/:banksId', allowIfLoggedin, banksController.getBanks); 
 
banksRoutes.put('/bank/:banksId', allowIfLoggedin, grantAccess('updateAny', 'profile'), banksController.updateBanks);
 
banksRoutes.delete('/bank/:banksId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), banksController.deleteBanks);
 
module.exports = banksRoutes;