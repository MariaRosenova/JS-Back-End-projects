const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [5, 'The title should be at least 5 characters long'],
        required: true,
    },
    type: {
        type: String,
        minLength: [3, 'The type should be at least 3 characters long'],
        required: true,
    },
    certificate: {
        type: String,
        minLength: [2, 'The certificate should be at least 2 characters long'],
        required: true,
    },
    courseImage: {
        type: String,
        match: /^https?:\/\//,
        required: true,
    },
    description: {
        type: String,
        minLength: [10, 'The description should be at least 10 characters long'],
        required: true,
    },
    price: {
        type: Number,
        validate: {
            validator: function (number) {
                return number >= 0;
            },
            message: (props) => `${props.value} should be a positive number`,
        },
        required: true,
    },
    createdAt: Date,
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

courseSchema.pre('save', function() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
});
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;