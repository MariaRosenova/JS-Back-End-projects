const User = require("../models/User");
const bcrypt = require("bcrypt");
const { SECRET } = require('../config/config');
const jwt = require('../lib/jwt');


exports.register = async (userData) => {
   const user = await User.findOne({email : userData.email});

   if (user) {
    throw new Error('User already exists');
   }

   return User.create(userData);
}

exports.login = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });

  if (!user) {
    throw new Error("Cannot find email or password");
  }

  const isValid = await bcrypt.compare(loginData.password, user.password);
  
  if (!isValid) {
    throw new Error("Cannot find email or password");
  }
  
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  
  const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
         return token;
};
