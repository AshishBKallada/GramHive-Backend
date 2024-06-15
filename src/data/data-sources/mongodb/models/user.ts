import mongoose, { Document, Schema } from "mongoose";

interface ILocation {
    latitude: number;
    longitude: number;
}

interface IUser extends Document {
    username: string;
    name: string;
    password?: string;
    email?: string;
    image?: string;
    isBan: boolean;
    website?: string;
    bio?: string;
    gender?: 'male' | 'female' | 'other';
    location: ILocation;
}

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    isBan: {
        type: Boolean,
        default: false,
    },
    website: {
        type: String,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
});

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
