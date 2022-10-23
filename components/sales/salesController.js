const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sales = require("./salesModel");
const productModel = require("../products/productsModel");
const nodemailer = require('nodemailer')
//createSales
exports.createSales = async (req, res, next) => {
  try {
     
    let invoiceId =
      "INV-" + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-";
    
    
      Sales.countDocuments({}).then(async (data) => {
      let count = Number(data) + 1;
      invoiceId = invoiceId + count;

      const invoiceData = {
        invoiceNumber:invoiceId,
        invoiceCreatedDate:req.body.invoiceCreatedDate,
        invoiceType:req.body.invoiceType,
        invoiceCategory:req.body.invoiceCategory,
        invoiceSubCategory:req.body.invoiceSubCategory,
        invoiceCurrency:req.body.invoiceCurrency,
        invoiceShipmentStatus:req.body.invoiceShipmentStatus,
        invoicePaymentType:req.body.invoicePaymentType,
        invoiceStatus:req.body.invoiceStatus,
        invoiceCustomer:req.body.invoiceCustomer,
        invoiceBroker:req.body.invoiceBroker,
        invoiceBanks:req.body.invoiceBanks,
        invoiceSubTotal:req.body.invoiceSubTotal,
        invoiceDiscountAmount:req.body.invoiceDiscountAmount,
        invoiceSubTotalAfterDiscount:req.body.invoiceSubTotalAfterDiscount,
        invoiceGrandTotal:req.body.invoiceGrandTotal,
        invoiceExtraCharges:req.body.invoiceExtraCharges,
        invoiceTotalAmountReceived:req.body.invoiceTotalAmountReceived,
        invoiceBalanceToReceived:req.body.invoiceBalanceToReceived,
        invoiceBalanceToCustomer:req.body.invoiceBalanceToCustomer,
        invoiceDate:req.body.invoiceDate,
        invoiceItemList:req.body.invoiceItemList,
      };

      const newSales = new Sales(invoiceData);

     
      await newSales.save();
      req.body.invoiceItemList.map(async itm=>{
        const updateBody = {
          isSold:true,
          invoiceNumber:invoiceId,
        }
        await productModel.findByIdAndUpdate(itm.id, updateBody)
      })
      res.json({
        data: newSales,
      });

      console.log(newSales)
    });
   
  } catch (error) {
    
    res.status(500).json(error)
  }
};

exports.getSales = async (req, res, next) => {
  const sales = await Sales.find({});
  console.log(sales)
  res.status(200).json({
    data: sales,
  });
};

exports.getSalesByCustomerId = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const sales = await Sales.aggregate([
      {
        '$match': {
          'invoiceCustomer.customerId': customerId
        }
      }
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

exports.updateInvoiceStatus = async (req, res, next) => {
  console.log("updateInvoiceStatus")
  try {
    const update = req.body;
    const invoiceId = req.params.salesId;
    await Sales.findByIdAndUpdate(invoiceId, {invoiceStatus: update.invoiceStatus});
    const user = await Sales.findById(invoiceId);
    console.log("req body", req.body)
    console.log("updated invoice ", user)
    res.status(200).json({
      data: user,
      message: "Sales has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSales = async (req, res, next) => {
  try {
    const update = req.body;
    const salesId = req.params.salesId;
    const beforeUpdate = await Sales.findById(salesId);
    console.log("update body", update)
    await Sales.findByIdAndUpdate(salesId, update);
    const afterUpdate = await Sales.findById(salesId);

    beforeUpdate.invoiceItemList.map(async itm=>{
      const updateBody = {
        isSold:false,
        invoiceNumber:"",
      }
      await productModel.findByIdAndUpdate(itm.id, updateBody)
    })

    if(req.body.invoiceStatus ==="Return" || req.body.invoiceStatus ==="Cancel"){
      console.log("invoice status ",req.body.invoiceStatus )
     

    }else{
      console.log("else invoice status ",req.body.invoiceStatus )
      afterUpdate.invoiceItemList.map(async itm=>{
        const updateBody = {
          isSold:true,
          invoiceNumber:afterUpdate.invoiceNumber,
        }
        await productModel.findByIdAndUpdate(itm.id, updateBody)
      })
    }





    res.status(200).json({
      data: afterUpdate,
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
  service:'gmail',
  auth:{
    user:"jjvideoder@gmail.com",
    pass:"Rukshana123@"
  }
})
let pdfViewerHtml = `<div> html <h1>JOKEr</h1></div>`
let mailOptions = {
  from:'jjvideoder@gmail.com',
  to:"jjvideoder@gmail.com",
  subject:"INvoice soft copy",
  html:pdfViewerHtml
}









exports.sendInvoice = async (req, res, next)=>{
console.log("sendInvoice api called")
  
  transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
      res.json(err)
    }else{
      res.json(info)
    }
  })
}
