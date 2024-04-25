import mongoose from "mongoose";
import CommentModel from "./comment";
const Like = require('./likes');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true,
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
            type: String,
            required: true,
        }
    ],
    comments: [CommentModel.schema],
    likes: [Like.schema],
    isChecked: {
        type: Boolean,
        required: true,
    }
})

const postModel = mongoose.model('posts', postSchema);

export default postModel;