import mongoose from "mongoose";
import CommentModel from "./comment";
const Like = require('./likes');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ],
    comments: [CommentModel.schema],
    likes: [Like.schema],
    isChecked: {
        type: Boolean,
        required: true,
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
    isBan:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true 
})

const postModel = mongoose.model('posts', postSchema);

export default postModel;