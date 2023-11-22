const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sales = require("./salesModel");
const productModel = require("../products/productsModel");
const nodemailer = require("nodemailer");
 

async function generateInvoiceId() {
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const count = await Sales.countDocuments({});
  const invoiceCount = Number(count) + 1;
  return `INV-${year}-${month}-${invoiceCount}`;
}

//createSales

exports.createSales = async (req, res, next) => {
   
  
  try {
    
    
     
    const invoiceId = await generateInvoiceId();

    const invoiceData = {
      invoiceNumber: invoiceId,
      invoiceCreatedDate: req.body.invoiceCreatedDate,
      invoiceType: req.body.invoiceType,
      invoiceCategory: req.body.invoiceCategory,
      invoiceSubCategory: req.body.invoiceSubCategory,
      invoiceCurrency: req.body.invoiceCurrency,
      invoiceShipmentStatus: req.body.invoiceShipmentStatus,
      invoicePaymentType: req.body.invoicePaymentType,
      invoiceStatus: req.body.invoiceStatus,
      invoiceCustomer: req.body.invoiceCustomer,
      invoiceBroker: req.body.invoiceBroker,
      invoiceBanks: req.body.invoiceBanks,
      invoiceSubTotal: req.body.invoiceSubTotal,
      invoiceDiscountAmount: req.body.invoiceDiscountAmount,
      invoiceSubTotalAfterDiscount: req.body.invoiceSubTotalAfterDiscount,
      invoiceGrandTotal: req.body.invoiceGrandTotal,
      invoiceExtraCharges: req.body.invoiceExtraCharges,
      invoiceTotalAmountReceived: req.body.invoiceTotalAmountReceived,
      invoiceBalanceToReceived: req.body.invoiceBalanceToReceived,
      invoiceBalanceToCustomer: req.body.invoiceBalanceToCustomer,
      invoiceDate: req.body.invoiceDate,
      invoiceItemList: req.body.invoiceItemList,
    };

    const newSales = new Sales(invoiceData);

    await newSales.save( );

    await Promise.all(
      req.body.invoiceItemList.map(async (itm) => {
        const updateBody = {
          isSold: true,
          invoiceNumber: invoiceId,
          storageBoxName: "", //removing storage location
          storageSlot: "", //removing storage location
        };
        await productModel.findByIdAndUpdate(itm.id, updateBody);
      })
    );

     

    res.json({
      data: newSales,
    });

    console.log(newSales);
  } catch (error) {
    
    console.log(error)
    res.status(500).json(error);

  }
};

exports.getSales = async (req, res, next) => {
  const sales = await Sales.find({}).sort({invoiceCreatedDate:-1});
  // console.log(sales)
  res.status(200).json({
    data: sales,
  });
};

exports.getSalesByCustomerId = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const sales = await Sales.aggregate([
      {
        $match: {
          "invoiceCustomer.customerId": customerId,
        },
      },
    ]);
    if (!sales) return next(new Error("Sales does not exist"));
    res.status(200).json({
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};


exports.getSingleSales = async (req, res, next) => {
  try {
    const salesId = req.params.salesId;
    const sales = await Sales.findById(salesId);
    if (!sales) return next(new Error("Sales does not exist"));
    res.status(200).json({
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};
exports.fetchUnsoldInvoices = async (req, res, next) => {
  try {
    const unsoldInvoices = await getUnsoldInvoices();

     
   
    res.status(200).json({
      data: unsoldInvoices,
    });
  } catch (error) {
    next(error);
  }
};

 

exports.updateInvoiceStatus = async (req, res, next) => {
  console.log("updateInvoiceStatus");
  try {
    const update = req.body;
    const invoiceId = req.params.salesId;
    await Sales.findByIdAndUpdate(invoiceId, {
      invoiceStatus: update.invoiceStatus,
    });
    const user = await Sales.findById(invoiceId);
    console.log("req body", req.body);
    console.log("updated invoice ", user);
    res.status(200).json({
      data: user,
      message: "Sales has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSalesOld = async (req, res, next) => {
  try {
    const update = req.body;
    const salesId = req.params.salesId;

    //1st step
    //fetching all details of particular sales
    const beforeUpdate = await Sales.findById(salesId);

    //2nd step
    beforeUpdate.invoiceItemList.map(async (itm) => {
      //removing invoice itemlists from invoice
      const updateBody = {
        isSold: false,
        invoiceNumber: "",
        storageBoxName: "", //removing storage location
        storageSlot: "", //removing storage location
      };
      await productModel.findByIdAndUpdate(itm.id, updateBody, { new: true });
    });

    //3rd Step
    //update with new details
    Sales.findByIdAndUpdate(salesId, update, { new: true }).then(
      async (afterUpdate) => {
        //re-fetching update
        // const afterUpdate = await Sales.findById(salesId);
        console.log("after update ", afterUpdate);

        if (
          req.body.invoiceStatus === "Return" ||
          req.body.invoiceStatus === "Cancel"
        ) {
          console.log("invoice status ", req.body.invoiceStatus);
        } else {
          console.log("else invoice status ", req.body.invoiceStatus);

          //4th Step
          //Updating Product details after the sale
          await afterUpdate.invoiceItemList.map(async (itm) => {
            const updateBody = {
              isSold: true,
              invoiceNumber: afterUpdate.invoiceNumber,
              storageBoxName: "", //removing storage location
              storageSlot: "", //removing storage location
            };
            await productModel.findByIdAndUpdate(itm.id, updateBody);
          });
        }

        res.status(200).json({
          data: afterUpdate,
          message: "Sales has been updated",
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.updateSales = async (req, res, next) => {
  try {
    const update = req.body;
    const salesId = req.params.salesId;

    const oldSales = await Sales.findById(salesId);
             

    const oldInvoiceItemList = oldSales.invoiceItemList;
    console.log('')
    console.log('')
    console.log("############## oldInvoiceItemList ###########")
    console.log(oldInvoiceItemList)
    console.log('')              
    console.log('')   
    const newInvoiceItemList = update.invoiceItemList;
    console.log('')
    console.log('')
    console.log("############## newInvoiceItemList ###########")
    console.log(newInvoiceItemList)
    console.log('')              
    console.log('')   

    const oldItemsIds = oldInvoiceItemList.map(item => item.id);

 

    const newItemsIds = newInvoiceItemList.map(item => item.id);

    console.log("############## oldItemsIds ###########")
    console.log(oldItemsIds)
    console.log('')
    console.log("############## newItemsIds ###########")
    console.log(newItemsIds)
    console.log('')

    const itemsToRemove = oldInvoiceItemList.filter(oldItem => !newItemsIds.includes(oldItem.id));

    console.log('')
    console.log("############## itemsToRemove ###########")
    console.log(itemsToRemove)
    console.log('')

    await Promise.all(itemsToRemove.map(async (item) => {

      console.log("restoring to store id ", item.id, item.productId)
      console.log('')
      await productModel.findByIdAndUpdate(item.id, {
        isSold: false,
        invoiceNumber: "",
      });
    }));

    // Update invoiceItemList in the database with the new list
    // Assuming 'update' contains the updated sales details including 'invoiceItemList'
    // ... (Logic to update invoiceItemList in the database)

    const salesInvoiceNumber = oldSales.invoiceNumber; // Replace with actual sales invoice number

    await Promise.all(newInvoiceItemList.map(async (item) => {
      console.log('')

      console.log("adding items to invoice ", item.id, item.productId)
      console.log('')


      await productModel.findByIdAndUpdate(item.id, {
        isSold: true,
        invoiceNumber: salesInvoiceNumber,
        storageBoxName: "", //removing storage location
        storageSlot: "", //removing storage location
      });

    }));

    // Update the sales document with the new details
    const afterUpdate = await Sales.findByIdAndUpdate(salesId, update, { new: true });

    console.log("############## after update ###########")
    console.log(afterUpdate.invoiceItemList.map(i=> i.id))

    res.status(200).json({
      data: afterUpdate,
      message: "Sales has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSalesMissingStone = async (req, res, next) => {
  try {
    const update = req.body;
      
    await Promise.all(update.map(async (item) => {
      console.log('')

      console.log("update Sales Missing Stone ", item.invoiceNumber, item.productId)
      console.log('')


      await productModel.updateOne({productId:item.productId}, {
        isSold: true,
        invoiceNumber: item.invoiceNumber,
        storageBoxName: "", //removing storage location
        storageSlot: "", //removing storage location
      });

    }));


    res.status(200).json({
      
      message: "Sales has been updated",
    });
     
   
  } catch (error) {
    next(error);
  }
};


exports.deleteSales = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Sales.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Sales has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jjvideoder@gmail.com",
    pass: "Rukshana123@",
  },
});
let pdfViewerHtml = `<div> html <h1>JOKEr</h1></div>`;
let mailOptions = {
  from: "jjvideoder@gmail.com",
  to: "jjvideoder@gmail.com",
  subject: "INvoice soft copy",
  html: pdfViewerHtml,
};

exports.sendInvoice = async (req, res, next) => {
  console.log("sendInvoice api called");

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json(err);
    } else {
      res.json(info);
    }
  });
};


const getUnsoldInvoices = async () => {
  try {
      const unsoldInvoices = await Sales.aggregate([
          { $unwind: "$invoiceItemList" },
          {
              $lookup: {
                  from: "products",
                  localField: "invoiceItemList.productId",
                  foreignField: "productId",
                  as: "productData"
              }
          },
          {
              $match: {
                  "productData.isSold": { $ne: true },
                  invoiceStatus: { $nin: ["Return", "Cancel"] }
              }
          },
          {
              $project: {
                  invoiceNumber: 1,
                  productId: { $arrayElemAt: ["$productData.productId", 0] },
                  isSold: { $arrayElemAt: ["$productData.isSold", 0] },
                  invoiceStatus: 1,
                  invoiceCreatedDate: 1
              }
          }
      ]);

      return unsoldInvoices;
  } catch (error) {
      // Handle errors here or pass them to the calling function/handler
      throw new Error("Unable to fetch unsold invoices");
  }
};
