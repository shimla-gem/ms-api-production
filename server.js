const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("./components/users/usersModel");
const usersRoutes = require("./components/users/usersRoutes");
const originRoutes = require("./components/origin/originRoutes");
const shapesRoutes = require("./components/shapes/shapesRoutes");
const titlesRoutes = require("./components/titles/titlesRoutes");

const suppliersRoutes = require("./components/suppliers/suppliersRoutes");
const customersRoutes = require("./components/customers/customersRoutes");
const banksRoutes = require("./components/banks/banksRoutes");
const productsRoutes = require("./components/products/productsRoutes");
const salesRoutes = require("./components/sales/salseRoutes");
const brokersRoutes = require("./components/brokers/brokersRoutes");
const storageRoutes = require("./components/storage/storageRoutes");

const tripRoutes = require("./components/trips/tripRoutes");

var cors = require("cors");

const connectDB = require("./config/db");
const exchangeRateLogRoute = require("./components/exchangeRates/exchangeRateRoutes");
require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

const app = express();

const PORT = process.env.PORT || 3500;

connectDB();

// mongoose.connect("mongodb://localhost:27017/shimla_gem").then(() => {
//   console.log("Connected to the Database successfully");
// });

//api request middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

//middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    console.log("Unauthorize! access token is expired")
    return res
      .status(401)
      .send({ message: "Unauthorize! access token is expired " });
  }

  return res.sendStatus(401).send({ message: "Unauthorized" });
};

app.use(async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const accessToken = req.headers["authorization"];
       const tkn = jwt.verify(accessToken, process.env.JWT_SECRET, async function (err, decoded) {
        if (decoded) {
          console.log("decoded", decoded);
          //success
          res.locals.loggedInUser = await User.findById(decoded.userId);
          next();
        }
        if (err) {
          return catchError (err , res)
        }
      });

    
    } else {
      //for public routes
      next();
    }
  } catch (error) {
    console.log("token error =====> ", error);
    next((err = error));
  }
});

// app.use(logError)+
// app.use(returnError)

//routes
app.use("/", usersRoutes);
app.use("/", originRoutes);
app.use("/", shapesRoutes);
app.use("/", titlesRoutes);
app.use("/", suppliersRoutes);
app.use("/", customersRoutes);
app.use("/", productsRoutes);
app.use("/", salesRoutes);
app.use("/", tripRoutes);
app.use("/", brokersRoutes);
app.use("/", banksRoutes);
app.use("/", storageRoutes);
app.use("/", exchangeRateLogRoute);

app.use("/", (req, res) => {
  res.send("Welcome shimla gem api");
});

//listing port
app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
