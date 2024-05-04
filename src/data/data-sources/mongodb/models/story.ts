import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    story: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    seenBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            time: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

const storyModel = mongoose.model('story', storySchema);
export default storyModel;
