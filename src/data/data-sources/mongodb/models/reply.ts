const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    reply:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const ReplyModel = mongoose.model('Reply',replySchema);
export default ReplyModel;