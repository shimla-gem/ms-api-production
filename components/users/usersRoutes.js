const express = require('express');
const userRoutes = express.Router();
const userController = require('./usersController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
userRoutes.post('/signup', userController.signup);
 
userRoutes.post('/login',  userController.login);
 
userRoutes.get('/user/:userId', allowIfLoggedin, userController.getUser);
 
userRoutes.get('/users',allowIfLoggedin, userController.getUsers);
 
userRoutes.put('/user/:userId',allowIfLoggedin, grantAccess('updateAny', 'profile'), userController.updateUser);
userRoutes.put('/user/password-change/:userId',allowIfLoggedin, grantAccess('updateAny', 'profile'), userController.updateUserPassword);
 
userRoutes.delete('/user/:userId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
module.exports = userRoutes;