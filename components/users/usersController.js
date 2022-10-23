const User = require("./usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

//signup

exports.signup = async (req,res) => {

  try {
    const { email, password, role , status } = req.body;

    if(!email) return res.status(400).json({
      validationError : "Email address is required"
    })

    if(!password) return res.status(400).json({
      validationError : "Password is required"
    })

    let userId = "1";
    User.countDocuments({}).then(async (data) => {
      let old_id = Number(data);
      userId = old_id + 1; 
      const hashedPassword = await hashPassword(password);
  
      //validation
     const email_data = User.findOne({ email})
     
      if(email_data)
      return res.status(400).json({
        validationError : "Email is already taken , try new email address"
      })

      const newUser = new User({
        // registerDate,
        userId,
        status,
        email,
        password: hashedPassword,
        role: role || "basic",
      });

      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      newUser.accessToken = accessToken;
     
      //save
      await newUser.save();
      res.json({
        data: newUser,
        accessToken,
      });
 

       
    });
  } catch (error) {
    console.log("server error ", error)
    res.status(500).json({error : "Server error in User Creation"})
  }
}

 

//login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
       
      return res.status(400).json({
        data: "Email does not exist"
      })
       
    } 
    
    const validPassword = await validatePassword(password, user.password);
    
   
    if (!validPassword) {
       
      return res.status(400).json({
        data: "Password is not correct"
      })
      
    } 
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users,
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error("User does not exist"));
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, update);
    const user = await User.findById(userId);
    res.status(200).json({
      data: user,
      message: "User has been updated",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateUserPassword = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    console.log("user id : ", userId)

    const hashedPasswordOutPut = await hashPassword(update.password);
    console.log("new password", update.password)
    console.log("new hash password", hashedPasswordOutPut)
    await User.findByIdAndUpdate(userId, {'password':hashedPasswordOutPut});
    const user = await User.findById(userId);
    res.status(200).json({
      data: user,
      message: "User password has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};


//roles based logging 
