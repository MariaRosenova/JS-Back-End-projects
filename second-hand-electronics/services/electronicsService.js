const Electronics = require('../models/Electronics');
const User = require('../models/User');

exports.createOffer = async (offer, userId) => {
    const createOffer = await Electronics.create({
        owner: userId,
        ...offer
    });
    console.log(offer)
    await User.findByIdAndUpdate(userId, {$push: {createdOffers: createOffer._id}})
}; 

exports.getAll = () => Electronics.find().populate('owner');

exports.search = (searchName, searchType) => {
    let query = {};
    
    if (searchName) {
        query.searchName = { $regex: new RegExp(searchName, 'i') };
    }

    if (searchType) {
        query.searchType = { $regex: new RegExp(searchType, 'i') };
    }

    return Electronics.find({query});
};

