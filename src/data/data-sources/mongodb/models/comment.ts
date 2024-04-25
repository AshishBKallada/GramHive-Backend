const mongoose = require('mongoose');
import ReplyModel from "./reply";
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replies: [ReplyModel.schema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel