 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Brokers = require("./brokersModel")

 
//createBrokers
exports.createBrokers = async (req, res, next) => {
  try {
    const { firstName, lastName,homeAddress,mobile,email,status } = req.body;
    let brokerId = "BROK-"+new Date().getFullYear()+"-"
    Brokers.countDocuments({}).then(async (data) => {
      brokerId = brokerId+Number(data);
      const newBrokers = new Brokers({
        brokerId,firstName, lastName,homeAddress,mobile,email,status
      })
      await newBrokers.save()
      res.json({
        data: newBrokers,
         
      });

    })
   
  } catch (error) {
    next(error);
  }
};
 

exports.getBrokers = async (req, res, next) => {
  let sortby = -1;
  
  const Brokerss = await Brokers.find({}).sort({ reg_date: sortby });
  
  res.status(200).json({
    data: Brokerss,
  });
};

exports.getSingleBrokers = async (req, res, next) => {
  try {
    const brokersId = req.params.brokersId;
    const brokers = await Brokers.findById(brokersId);
    if (!brokers) return next(new Error("Brokers does not exist"));
    res.status(200).json({
      data: brokers,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBrokers = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await Brokers.findByIdAndUpdate(userId, update);
    const user = await Brokers.findById(userId);
    res.status(200).json({
      data: user,
      message: "Brokers has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBrokers = async (req, res, next) => {
  try {
    const brokerId = req.params.brokerId;
    await Brokers.findByIdAndDelete(brokerId);
    res.status(200).json({
      data: null,
      message: "Brokers has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 