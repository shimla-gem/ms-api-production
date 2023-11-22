 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ExchangeRateLog = require("./exchangeRateModel")

 
//createshapes
exports.createLog = async (req, res, next) => {
  try {
    const { date, prev, latest, effectedCounts } = req.body;

    const exchangeRateLog = new ExchangeRateLog({
      date: date,
      prev: prev,
      latest: latest,
      effectedCounts: effectedCounts
    });

    console.log(exchangeRateLog);

    await exchangeRateLog.save();

    res.json({
      data: exchangeRateLog
    });
  } catch (error) {
    next(error);
  }
};

 

exports.getAllLogs = async (req, res, next) => {
  const shapes = await ExchangeRateLog.find({}).sort({_id:-1});
   
  res.status(200).json({
    data: shapes,
  });
};
 

 