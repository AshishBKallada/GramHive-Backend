import mongoose, { Document, Schema } from 'mongoose';

interface AdImage {
    caption: string;
    url: string;
    imageFile: string;
}


interface Ad extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    images: AdImage[];
    rate: number;
    payment?: 'pending' | 'paid';
    status: boolean;
    createdAt: Date;
}

const adImageSchema = new Schema<AdImage>({
    caption: { type: String, required: true },
    url: { type: String, required: true },
    imageFile: { type: String, required: true }
});

const adSchema = new Schema<Ad>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    images: { type: [adImageSchema], required: true },
    rate: { type: Number, required: true },
    payment: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const AdModel = mongoose.model<Ad>('Ad', adSchema);
export default AdModel;
