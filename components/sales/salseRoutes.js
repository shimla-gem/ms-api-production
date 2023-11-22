const express = require('express');
const salesRoutes = express.Router();
const salesController = require('./salesController');
const { allowIfLoggedin,grantAccess } = require('../roles/rolesPermission')
 
salesRoutes.post('/sales', salesController.createSales);
salesRoutes.post('/sendInvoice', salesController.sendInvoice);

salesRoutes.get('/sales', salesController.getSales);
salesRoutes.get('/sales/unsold-invoices', salesController.fetchUnsoldInvoices);
salesRoutes.put('/sales/update-sales-missingStone', salesController.updateSalesMissingStone);
salesRoutes.get('/sales/customer/:customerId', salesController.getSalesByCustomerId);

salesRoutes.get('/sales/:salesId', allowIfLoggedin, salesController.getSingleSales); 

salesRoutes.put('/sales/status/:salesId', allowIfLoggedin, salesController.updateInvoiceStatus); 
 
salesRoutes.put('/sales/:salesId', allowIfLoggedin,  salesController.updateSales);
 
salesRoutes.delete('/sales/:salesId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), salesController.deleteSales);
 
module.exports = salesRoutes;