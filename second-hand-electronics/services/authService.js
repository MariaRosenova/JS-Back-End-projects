const User = require('../models/User');
const { SECRET } = require('../config/config');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

exports.register = (registerData) => User.create(registerData);

exports.login = async (loginData) => {
    const user = await User.findOne({email : loginData.email});
    console.log(loginData)
    if (!user) {
        throw new Error('Cannot find email or password');
    }

    const isValid = await bcrypt.compare(loginData.password, user.password);

    if (!isValid) {
        throw new Error('Cannot find email or password');
    }

    const token = await generateToken(user);

    return token;
}


function generateToken(user) {
    const payload = {
        userId: user._id,
        username: user.username,
        email: user.email
    };

    return jwt.sign(payload, SECRET, {expiresIn: '2h'});
}