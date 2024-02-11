const User = require("../models/User");
const bcrypt = require("bcrypt");
const { SECRET } = require('../config/config');
const jwt = require('../lib/jwt');


exports.createUser = (userData) => {
  const user = User.findOne({ email: userData.email });

  if (user) {
    throw new Error("Email already exists");
  }
  return User.create(userData);
};

exports.login = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });

  if (!user) {
    throw new Error("Cannot find email or password");
  }

  const isValid = await bcrypt.compare(loginData.password, user.password);
  
  if (!isValid) {
    throw new Error("Cannot find email or password");
  } else {
    console.log("is valid keep calm");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };
  
  const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
  return token;
};
