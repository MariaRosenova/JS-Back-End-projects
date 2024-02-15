const Course = require("../models/Course");

exports.createCourse =  (courseData) => {
  try {
    return Course.create(courseData);
    console.log('ready')
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = () => Course.find();