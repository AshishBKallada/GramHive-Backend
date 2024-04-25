import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true, 
    }
})

const otpModel = mongoose.model('otps',otpSchema);

export default otpModel;