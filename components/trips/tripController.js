 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Trip = require("./tripModel")

 
//createTrip
exports.createTrip = async (req, res, next) => {
  try {
    const { tripName, startDate,endDate,fromCountry,toCountry,expense,cities,status } = req.body;
    console.log("trip data : ", req.body)
    let tripId = "TRIP-"+new Date().getFullYear()+"-"
    Trip.countDocuments({}).then(async (data) => {
      tripId = tripId+Number(data);
      const newTrip = new Trip({
        tripId,tripName, startDate,endDate,fromCountry,toCountry,expense,cities,status
      })
      await newTrip.save()
 
      res.json({
        data: newTrip,
         
      });

    })
   
  } catch (error) {
    next(error);
  }
};
 

exports.getTrips = async (req, res, next) => {
  const Trips = await Trip.find({}).sort({tripId:-1});
   
  res.status(200).json({
    data: Trips,
  });
};

exports.getSingleTrip = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip) return next(new Error("Trip does not exist"));
    res.status(200).json({
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const update = req.body;
    const trip_id = req.params.tripId;
    console.log(trip_id)
    await Trip.findByIdAndUpdate(update.id, update);
    const user = await Trip.findById(update.id);
    res.status(200).json({
      data: user,
      message: "Trip has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Trip.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "Trip has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

 