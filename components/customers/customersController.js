 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Customers = require("./customersModel");
const suppliersModel = require("../suppliers/suppliersModel");
const productModel = require("../products/productsModel");

 
//createCustomers
exports.createCustomers = async (req, res, next) => {
  try {
    const { firstName, lastName,homeAddress,country,city,mobile,email,status,
      businessName,
      businessAddress,
      businessEmail,
      businessEmail2,
      businessContact,
      businessContact2,
      businessVatNumber,
      businessCountry,
      businessCity,
      faxNumber
    
    } = req.body;
    let customerId = "CUS-"+new Date().getFullYear()+"-"
    Customers.countDocuments({}).then(async (data) => {
      customerId = customerId+Number(data);
      const newCustomers = new Customers({
        businessVatNumber,
        businessCountry,
        businessCity,
        faxNumber,
        customerId,firstName, lastName,homeAddress,businessAddress,businessName,businessContact,businessEmail,businessContact2,businessEmail2,country,city,mobile,email,status
      })
      await newCustomers.save()
      res.json({
        data: newCustomers,
         
      });

    })
   
  } catch (error) {
    next(error);
  }
};
 

exports.getCustomers = async (req, res, next) => {
  const Customerss = await Customers.find({});
  res.status(200).json({
    data: Customerss,
  });
};

exports.getSingleCustomers = async (req, res, next) => {
  try {
    const customersId = req.params.customersId;
    const customers = await Customers.findById(customersId);
    if (!customers) return next(new Error("Customers does not exist"));
    res.status(200).json({
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomers = async (req, res, next) => {
  try {
    const update = req.body;
    const customersId = req.params.customersId;
    await Customers.findByIdAndUpdate(customersId, update);
    const user = await Customers.findById(customersId);
    res.status(200).json({
      data: user,
      message: "Customers has been updated",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateStatusALl = async (req, res, next) => {
  try {
     


    // const user = await Customers.updateMany({},[
    const user = await productModel.updateMany({productId:[367]},[
        {
        '$set': {
          // 'weight': "1.05",
          // 'sellPriceForeigners2': "370",
          // 'sellPriceLocal2': "133200",
          'sellPriceForeigners': "400",
          'sellPriceLocal': "144000",
        }
      }
    ]).exec()
    console.log(user)
    res.status(200).json({user:user});
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomers = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Customers.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Customers has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 