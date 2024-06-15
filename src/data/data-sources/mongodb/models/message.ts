import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sharedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    files: [
        {
            url: String,
            fileType: String
        }
    ],
    audio: {
        type: String,
    }
}, {
    timestamps: true,
});

const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;
