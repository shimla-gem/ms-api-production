 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Origin = require("./originModel")

 
//createOrigin
exports.createOrigin = async (req, res, next) => {
  try {
    const { originName, originDescription } = req.body;
    const newOrigin = new Origin({
      originName : req.body.originName,
      originDescription : req.body.originDescription,
      originStatus : req.body.originStatus
    })
    await newOrigin.save()
    res.json({
      data: newOrigin,
       
    });
  } catch (error) {
    next(error);
  }
};
 

exports.getOrigins = async (req, res, next) => {
  const Origins = await Origin.find({});
  res.status(200).json({
    data: Origins,
  });
};

exports.getOrigin = async (req, res, next) => {
  try {
    const originId = req.params.originId;
    const origin = await Origin.findById(originId);
    if (!origin) return next(new Error("Origin does not exist"));
    res.status(200).json({
      data: origin,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrigin = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await Origin.findByIdAndUpdate(userId, update);
    const user = await Origin.findById(userId);
    res.status(200).json({
      data: user,
      message: "Origin has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrigin = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Origin.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Origin has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 