 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const precious = require("./preciousModel")

 
//createprecious
exports.createPrecious = async (req, res, next) => {
  try {
    const { preciousName, preciousDescription } = req.body;
    const newprecious = new precious({
      preciousName : req.body.preciousName,
      preciousDescription : req.body.preciousDescription,
      preciousStatus : req.body.preciousStatus
    })
    await newprecious.save()
    res.json({
      data: newprecious,
       
    });
  } catch (error) {
    next(error);
  }
};
 

exports.getPrecious = async (req, res, next) => {
  const preciouss = await precious.find({});
  res.status(200).json({
    data: preciouss,
  });
};

exports.getSinglePrecious = async (req, res, next) => {
  try {
    const preciousId = req.params.preciousId;
    const precious = await precious.findById(preciousId);
    if (!precious) return next(new Error("precious does not exist"));
    res.status(200).json({
      data: precious,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePrecious = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await precious.findByIdAndUpdate(userId, update);
    const user = await precious.findById(userId);
    res.status(200).json({
      data: user,
      message: "precious has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePrecious = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await precious.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "precious has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 