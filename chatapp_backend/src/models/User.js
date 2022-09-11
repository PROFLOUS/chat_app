const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const NotFoundError = require('../exception/NotFoundError');


const userSchema = new Schema({
    avatar: {
        type: String,
        required: true,
    },
    email: {
        type: String,

    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    sex: {
        type: Number,
        required: true,
    }
},{timestamps: true});

userSchema.statics.getById = async (_id, message = 'User') => {
    
    const user = await User.findOne({ _id, isActived: true });
    console.log(user)
    if (!user) throw new NotFoundError(message);

    const {
        firstName,
        lastName,
        email,
        avatar,
        sex,
    } = user;
    return {
        _id,
        firstName,
        lastName,
        email,
        avatar,
        sex,
    };
};


const User = mongoose.model('User', userSchema);

module.exports = User;