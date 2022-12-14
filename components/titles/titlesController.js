 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const titles = require("./titlesModel")

 
//createTitles
exports.createTitles = async (req, res, next) => {
  try {
    
    const newtitles = new titles({
      titlesName : req.body.titlesName,
      titlesCategory : req.body.titlesCategory,
      titlesDescription : req.body.titlesDescription,
      titlesStatus : req.body.titlesStatus
    })
    await newtitles.save()
    res.json({
      data: newtitles,
       
    });
  } catch (error) {
    next(error);
  }
};
 

exports.getTitles = async (req, res, next) => {
  const titless = await titles.find({});
  res.status(200).json({
    data: titless,
  });
};

exports.getSingleTitles = async (req, res, next) => {
  try {
    const titlesId = req.params.titlesId;
    const titles = await titles.findById(titlesId);
    if (!titles) return next(new Error("titles does not exist"));
    res.status(200).json({
      data: titles,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTitles = async (req, res, next) => {
  try {
    const update = req.body;
    const titlesId = req.params.titlesId;
    // console.log("titlesId", titlesId)
    const updated = await titles.findByIdAndUpdate(titlesId, update);
    const titles_data = await titles.findById(titlesId);
    // console.log("updated", updated)
    // console.log("titles_data", titles_data)
    res.status(200).json({
      data: titles_data,
      message: "titles has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTitles = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await titles.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "titles has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 