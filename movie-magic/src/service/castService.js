const Cast = require('../models/Cast');
const Movie = require('../models/Movie');

exports.create = (castData) => Cast.create(castData);


exports.getAll = async () => Cast.find().lean();

exports.getByIds = (castIds) => {
    const casts = Cast.find({_id: {$in: castIds}});

    return casts;
}