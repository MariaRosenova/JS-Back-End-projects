const {Schema, model, MongooseError} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, 'The username should be at least 2 characters long'],
    },
    email: {
        type: String,
        required: true,
        minLength: [2, 'The email should be at least 10 characters long'],
    },
    password: {
        type: String,
        required: true,
        minLength: [2, 'The password should be at least 10 characters long'],
    },
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

    
const User = model('User', userSchema);

module.exports = User;