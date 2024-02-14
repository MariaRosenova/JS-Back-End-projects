const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

//TODO: Filter result in mongoDB
exports.search = (title, genre, year) => {

  let query = {};

  if (title) {
    query.title = new RegExp(title, "i");
  }

  if (genre) {
    query.genre = genre.toLowerCase();
  }

  if (year) {
    query.year = year;
  }
  return Movie.find(query);
};

exports.getOne = (movieId) => Movie.findById(movieId).populate("casts");

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
  //  return Movie.findByIdAndUpdate(movieId, {$push: {casts : castId}});

  const movie = await this.getOne(movieId);

  //TODO: Validate castId if exists
  //TODO: Validate if cast is already added

  movie.casts.push(castId);

  return movie.save();
};
