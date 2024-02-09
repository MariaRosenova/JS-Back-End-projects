const {Schema, model, MongooseError} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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