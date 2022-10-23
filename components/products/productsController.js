const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Product = require("./productsModel");

//createProduct
exports.createProduct = async (req, res, next) => {
  try {
    let productId = "1";
    Product.countDocuments({}).then(async (data) => {
      let old_id = Number(data);
      productId = old_id + 1;

      console.log("productId", productId);
      console.log("save product res.body", res.body);

      const newProduct = new Product({
        productId,
        title: req.body[0].title,
        description: req.body[0].description,

        category: req.body[0].category,
        date: req.body[0].date,
        clarity: req.body[0].clarity,
        need_recut: req.body[0].need_recut,
        treatment_type: req.body[0].treatment_type,
        origin: req.body[0].origin,
        shape: req.body[0].shape,
        weight: req.body[0].weight,
        dimensionHeight: req.body[0].dimensionHeight,
        dimensionWidth: req.body[0].dimensionWidth,
        dimensionDepth: req.body[0].dimensionDepth,
        buyCurrency: req.body[0].buyCurrency,
        buyPrice: req.body[0].buyPrice,
        sellPriceLocal: req.body[0].sellPriceLocal,
        sellLocalCurrency: req.body[0].sellLocalCurrency,
        sellForeignersCurrency: req.body[0].sellForeignersCurrency,
        sellPriceForeigners: req.body[0].sellPriceForeigners,   
        sellPriceLocal2:  req.body[0].sellPriceLocal2,   
        sellPriceForeigners2:  req.body[0].sellPriceForeigners2,
        priceVariant: req.body[0].priceVariant,
        buyPiece: req.body[0].buyPiece,
        exchangeRate:  req.body[0]?.exchangeRate,
        
        exportMainCategory:  req.body[0]?.exportMainCategory,
        exportWeightRange:  req.body[0]?.exportWeightRange,

        supplier: req.body[0].supplier,

        customer: req.body[0].customer,
        images: req.body[0].images,
        videos: req.body[0].videos,
      });
      await newProduct.save();
      res.json({
        data: newProduct,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchFilterProduct = async (req, res, next) => {
  console.log("filters", req.body);
  let a = req.body;
  let sort = "";
  let isSold = false;
  for (var key in a) {
    if (a[key] === "") {
      delete a[key];
      continue;
    }
    if (key === "isSold" && a[key] !== "All") {
      if (a[key] === "Sold") a[key] = true;
      else  a[key] = { $ne: true };
    }else if(key === "isSold"){
      delete a[key];
      continue;
    }

    if (key === "productId" && a[key] !== "") {
      if(a[key] !== "") console.log(" product key is empty")
      a[key] = { $in: a[key].split(",") };
    }

    if (key === "sort") {
      sort = a[key];
      delete a[key];
    } //removing sort object
  }
  let sortby = sort && sort === "Asc" ? 1 : -1;
  console.log(a);
  console.log("sort by : ", sort);
  const Products = await Product.find(a).sort({ _id: sortby });
  // console.log(Products)
  res.status(200).json({
    data: Products,
  });
};
exports.getProducts = async (req, res, next) => {
  const Products = await Product.find({}).sort({ _id: -1 });
  console.log("Products count", Products.length)
  res.status(200).json({
    data: Products,
  });
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) return next(new Error("Product does not exist"));
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const update = req.body;
     
    const productId = req.params.productId;
    await Product.findByIdAndUpdate(productId, update);
    const product = await Product.findById(productId);
    res.status(200).json({
      data: product,
      message: "Product has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Product.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Product has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
