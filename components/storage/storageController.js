 
const Storages = require("./storageModel");

//createStorages
exports.createStorages = async (req, res, next) => {
  try {
    const {
     
      storageBoxName,
      storageBoxRowSize,
      storageBoxColumnSize,
      
    } = req.body;
    let storageId = "STORAGE-" + new Date().getFullYear() + "-";
    Storages.countDocuments({}).then(async (data) => {
      storageId = storageId + Number(data);
      const newStorages = new Storages({
        storageBoxId:storageId,
        storageBoxName,
        storageBoxRowSize,
        storageBoxColumnSize,
      });
      await newStorages.save();
      res.json({
        data: newStorages,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.getStorages = async (req, res, next) => {
  const Storagess = await Storages.find({});
  res.status(200).json({
    data: Storagess,
  });
};

exports.getSingleStorages = async (req, res, next) => {
  try {
    const storagesId = req.params.storagesId;
    const storages = await Storages.findById(storagesId);
    if (!storages) return next(new Error("Storages does not exist"));
    res.status(200).json({
      data: storages,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStorages = async (req, res, next) => {
  try {
    const update = req.body;
    const storagesId = req.params.storagesId;
    await Storages.findByIdAndUpdate(storagesId, update);
    const user = await Storages.findById(storagesId);
    res.status(200).json({
      data: user,
      message: "Storages has been updated",
    });
  } catch (error) {
    next(error);
  }
};
// exports.updateStatusALl = async (req, res, next) => {
//   try {
//     // const user = await Storages.updateMany({},[
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

exports.deleteStorages = async (req, res, next) => {
  try {
    const storageId = req.params.storageId;
    await Storages.findByIdAndDelete(storageId);
    res.status(200).json({
      data: null,
      message: "Storages has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
