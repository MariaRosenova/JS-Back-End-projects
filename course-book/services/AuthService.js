const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jsonwebtoken = require('jsonwebtoken')

exports.createUser = (userData) => {
  const user = await.findOne({ email: userData.email });

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
    username: user.username,
  };

  const SECRET = 'kddkfksklfo5fs5f8f2f75';

  const token = jsonwebtoken.sign(payload, SECRET, {expiresIn: '2h'});

  
};
