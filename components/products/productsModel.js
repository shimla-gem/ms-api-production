const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: { type: String },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: { type: String },
  priceVariant: { type: String },

  date: { type: String },
  clarity: { type: String },
  need_recut: { type: String },
  treatment_type: { type: String },
  origin: { type: String },
  shape: { type: String },
  weight: { type: String },
  category: { type: String, required: true },
  dimensionHeight: { type: String },
  dimensionWidth: { type: String },
  dimensionDepth: { type: String },
  isSold: { type: Boolean , default : false},
  invoiceNumber: { type: String },

  //price details
  buyCurrency: { type: String },
  buyPrice: { type: String },
  exchangeRate: { type: String },
  buyPiece: { type: String },

  sellPriceLocal: { type: String },
  sellPriceLocal2: { type: String },
  sellLocalCurrency: { type: String },
  sellForeignersCurrency: { type: String },
  sellPriceForeigners: { type: String },
  sellPriceForeigners2: { type: String },

  //store
  storeBox: { type: String },
  storeBoxLocation: { type: String }, //LocationBoxName+Row+Column

  //export
  exportMainCategory: { type: String },
  exportWeightRange: { type: String }, // 0.00  - 2.99 max  or above 3
  supplier: [],

  customer: [],
  images: [],
  videos: [],
  verify: {
    type: Boolean,
    default: false,
  },
  verifyDate: { Date },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  productStatus: {
    type: String,
    default: "Active",
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
