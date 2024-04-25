const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    followed_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

const followModel = mongoose.model('followers',followSchema);
export default followModel;