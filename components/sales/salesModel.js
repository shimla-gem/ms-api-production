const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = new Schema({
  invoiceCreatedDate: { type: String },
  invoiceType: { type: String },
  invoiceCategory: { type: String },
  invoiceSubCategory: { type: String }, //if category is visit then sub cat is list of visit // partial // installment
  invoiceCurrency: { type: String },
  invoiceShipmentStatus: { type: String },
  invoicePaymentType: { type: String },
  invoiceDate: { type: String },
  invoiceBanks: [],
  invoiceNumber: { type: String },
  invoiceCreatedBy: { type: String },
  invoiceStatus: { type: String },
  invoiceCustomer: [],
  invoiceBroker: [],
  invoiceItemList: [],
  invoiceSubTotal: { type: String },
  invoiceDiscountAmount: { type: String },
  invoiceSubTotalAfterDiscount: { type: String },
  invoiceGrandTotal: { type: String },
  invoiceExtraCharges: { type: String },
  invoiceTotalAmountReceived: { type: String },
  invoiceBalanceToCustomer: { type: String },
  invoiceBalanceToReceived: { type: String },
});

 
 
 

const salesModel = mongoose.model("sales", salesSchema);

module.exports = salesModel;
