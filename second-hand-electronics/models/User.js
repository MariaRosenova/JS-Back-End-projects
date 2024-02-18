const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdOffers: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronics',
    }],
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;

    next();
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new MongooseError('Password Mismatch!')
        }
    });

const User = mongoose.model('User', userSchema);


module.exports = User;
