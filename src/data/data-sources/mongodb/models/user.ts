import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    image: {
        type: String,
    },
    isBan: {
        type: Boolean,
        default: false
    },
    website: {
        type: String,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'] 
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
