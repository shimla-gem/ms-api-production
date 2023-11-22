const express = require('express');
const exchangeRateLogRoute = express.Router();
const exchangeRateLogController = require('./exchangeRateController');
 
 
 
exchangeRateLogRoute.post('/exchangeRateLog', exchangeRateLogController.createLog);

exchangeRateLogRoute.get('/exchangeRateLog', exchangeRateLogController.getAllLogs);
 
 
 
module.exports = exchangeRateLogRoute;