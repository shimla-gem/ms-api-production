 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Shapes = require("./shapesModel")

 
//createshapes
exports.createShapes = async (req, res, next) => {
  try {
    const { shapesName, shapesDescription } = req.body;
    const newshapes = new Shapes({
      shapesName : req.body.shapesName,
      shapesDescription : req.body.shapesDescription,
      shapesStatus : req.body.shapesStatus
    })
    console.log(newshapes)
    await newshapes.save()
    res.json({
      data: newshapes,
       
    });
  } catch (error) {
    next(error);
  }
};
 

exports.getShapes = async (req, res, next) => {
  const shapes = await Shapes.find({});
  console.log("Shapes fetching", shapes)
  res.status(200).json({
    data: shapes,
  });
};

exports.getSingleShapes = async (req, res, next) => {
  try {
    const shapesId = req.params.shapesId;
    const shapes = await Shapes.findById(shapesId);
    if (!shapes) return next(new Error("Shapes does not exist"));
    res.status(200).json({
      data: shapes,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateShapes = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await Shapes.findByIdAndUpdate(userId, update);
    const user = await Shapes.findById(userId);
    res.status(200).json({
      data: user,
      message: "Shapes has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteShapes = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Shapes.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Shapes has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 