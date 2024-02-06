import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    const userId = user._id;
    generateToken(res, userId);
    res.json({ user });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const userNameExist = await User.findOne({ userName });

  if (userNameExist) {
    res.status(400);
    throw new Error(`User name ${userNameExist} is already taken`);
  }

  const user = await User.create({
    userName,
    password,
  });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      name: user.userName,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwtCookie", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const jwtCookie = req.cookies?.jwtCookie;

  if (jwtCookie) {
    jwt.verify(jwtCookie, process.env.JWT_SECRET, {}, async (err, data) => {
      if (err) throw err;
      const userDocs = await User.findById(data.userId);

      res.json({ userDocs });
    });
  } else {
    res.status(401);
    throw new Error("Token not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
