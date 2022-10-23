 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Suppliers = require("./suppliersModel")

 
//createSuppliers
exports.createSuppliers = async (req, res, next) => {
  try {
    const { firstName, lastName,homeAddress,businessAddress,companyName,companyContact,companyEmail,country,city,mobile,email,status } = req.body;
    const newSuppliers = new Suppliers({
      firstName, lastName,homeAddress,businessAddress,companyName,companyContact,companyEmail,country,city,mobile,email,status
    })
    await newSuppliers.save()
    res.json({
      data: newSuppliers,
       
    });
  } catch (error) {
    next(error);
  }
};
 

exports.getSuppliers = async (req, res, next) => {
  const Supplierss = await Suppliers.find({});
  res.status(200).json({
    data: Supplierss,
  });
};

exports.getSingleSuppliers = async (req, res, next) => {
  try {
    const suppliersId = req.params.suppliersId;
    const suppliers = await Suppliers.findById(suppliersId);
    if (!suppliers) return next(new Error("Suppliers does not exist"));
    res.status(200).json({
      data: suppliers,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSuppliers = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await Suppliers.findByIdAndUpdate(userId, update);
    const user = await Suppliers.findById(userId);
    res.status(200).json({
      data: user,
      message: "Suppliers has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSuppliers = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Suppliers.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Suppliers has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 