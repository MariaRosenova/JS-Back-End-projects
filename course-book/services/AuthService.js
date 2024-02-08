const User = require('../models/User');

const createUser = (userData) => {
    try{
        User.create(userData);
        console.log('User created successfully')
    } catch (error) {
        console.log('Error creating user:', err.message);
        throw error;
    }
};

module.exports = {
    createUser
};