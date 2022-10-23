 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SemiPrecious = require("./semiPreciousModel")

 
//createsemiPrecious
exports.createSemiPrecious = async (req, res, next) => {
  try {
    const { semiPreciousName, semiPreciousDescription } = req.body;
    const newsemiPrecious = new SemiPrecious({
      semiPreciousName : req.body.semiPreciousName,
      semiPreciousDescription : req.body.semiPreciousDescription,
      
      semiPreciousStatus: req.body.semiPreciousStatus,
      precious: req.body.precious,
    })
    await newsemiPrecious.save()
    res.json({
      data: newsemiPrecious,
       
    });
  } catch (error) {
    next(error);
  }
};
 

exports.getSemiPrecious = async (req, res, next) => {
  const semiPrecious = await SemiPrecious.find({});
  res.status(200).json({
    data: semiPrecious,
  });
};

exports.getSingleSemiPrecious = async (req, res, next) => {
  try {
    const semiPreciousId = req.params.semiPreciousId;
    const semiPrecious = await SemiPrecious.findById(semiPreciousId);
    if (!semiPrecious) return next(new Error("SemiPrecious does not exist"));
    res.status(200).json({
      data: semiPrecious,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSemiPrecious = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await SemiPrecious.findByIdAndUpdate(userId, update);
    const user = await SemiPrecious.findById(userId);
    res.status(200).json({
      data: user,
      message: "SemiPrecious has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSemiPrecious = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await SemiPrecious.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "SemiPrecious has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 