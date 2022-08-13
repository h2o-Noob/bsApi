const ErrorHandler = require("../utils/errorHandler");
const userSchema = require("../models/UserModel");
const sendtoken = require("../utils/jwt");

// register user
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password)
    const User = await userSchema.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample id",
        url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      },
    });

    sendtoken(User, 201, res);
  } catch (err) {
    if (err.code === 11000) {
      let dup = Object.keys(err.keyValue)[0];
      return next(
        new ErrorHandler(`a user with that ${dup} already exists`, 400)
      );
    }
    return next( new ErrorHandler(err))

    // let fault = Object.keys(err.errors)[0];
    // return next(
    //   new ErrorHandler(`${fault} requires minimum 3 charecters`, 400)
    // );
  }
};

// login function
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("please enter email and password", 400));
    }

    const User = await userSchema.findOne({ email }).select("+password");

    if (!User) {
      return next(
        new ErrorHandler("please enter correct email and password", 401)
      );
    }

    const isPasswordMatched = await User.comparePasswords(password);

    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("please enter correct email and password", 401)
      );
    }

    sendtoken(User, 200, res);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// logout method
exports.logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

// user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.User.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// update user password
exports.updateUserPassword = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.User.id).select("+password");

    const isPasswordMatched = await user.comparePasswords(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("please enter correct password", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("password does not match confirm password", 400)
      );
    }

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const User = await userSchema.findByIdAndUpdate(req.User.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      User,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find();

    res.status(200).json({
      success: true,
      message: "all users displayed successfully",
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get single user
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.id);

    if (!user) {
      next(new ErrorHandler(`User with id: ${req.params.id} not found`));
    }
    res.status(200).json({
      success: true,
      message: "user found successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// update roles
exports.updateRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const User = await userSchema.findByIdAndUpdate(
      req.params.id,
      newUserData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: `role updated to ${req.body.role}`,
      User,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const User = await userSchema.findByIdAndDelete(req.params.id);

    if (!User) {
      next(new ErrorHandler(`user with id: ${req.params.id} not found`));
    }

    await User.remove();

    res.status(200).json({
      success: true,
      message: "user removed successfully",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
