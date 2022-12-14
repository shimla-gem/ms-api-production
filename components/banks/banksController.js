 
const Banks = require("./banksModel");

//createBanks
exports.createBanks = async (req, res, next) => {
  try {
    const {
     
      bankName,
      bankCode,
      accountName,
      accountNo,
      swiftCode,
      bankAddress,
      routingNo,
      country,
      status,
    } = req.body;
    let bankId = "BANK-" + new Date().getFullYear() + "-";
    Banks.countDocuments({}).then(async (data) => {
      bankId = bankId + Number(data);
      const newBanks = new Banks({
        bankId,
        bankName,
        bankCode,
        accountName,
        accountNo,
        swiftCode,
        bankAddress,
        routingNo,
        country,
        status,
      });
      await newBanks.save();
      res.json({
        data: newBanks,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.getBanks = async (req, res, next) => {
  const Bankss = await Banks.find({});
  res.status(200).json({
    data: Bankss,
  });
};

exports.getSingleBanks = async (req, res, next) => {
  try {
    const banksId = req.params.banksId;
    const banks = await Banks.findById(banksId);
    if (!banks) return next(new Error("Banks does not exist"));
    res.status(200).json({
      data: banks,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBanks = async (req, res, next) => {
  try {
    const update = req.body;
    const banksId = req.params.banksId;
    await Banks.findByIdAndUpdate(banksId, update);
    const user = await Banks.findById(banksId);
    res.status(200).json({
      data: user,
      message: "Banks has been updated",
    });
  } catch (error) {
    next(error);
  }
};
// exports.updateStatusALl = async (req, res, next) => {
//   try {
//     // const user = await Banks.updateMany({},[
//     const user = await productModel
//       .updateMany({ productId: [367] }, [
//         {
//           $set: {
//             // 'weight': "1.05",
//             // 'sellPriceForeigners2': "370",
//             // 'sellPriceLocal2': "133200",
//             sellPriceForeigners: "400",
//             sellPriceLocal: "144000",
//           },
//         },
//       ])
//       .exec();
//     console.log(user);
//     res.status(200).json({ user: user });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteBanks = async (req, res, next) => {
  try {
    const bankId = req.params.bankId;
    await Banks.findByIdAndDelete(bankId);
    res.status(200).json({
      data: null,
      message: "Banks has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
