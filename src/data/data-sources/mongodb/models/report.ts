import mongoose, { Document } from 'mongoose';

interface IUserReport {
    author: mongoose.Schema.Types.ObjectId;
    category: string;
    reason: string;
    createdAt: Date;
}

interface IReport extends Document {
    type: 'user' | 'post' | 'content';
    reportedUser?: mongoose.Schema.Types.ObjectId;
    reportedPost?: mongoose.Schema.Types.ObjectId;
    content?: string;
    createdAt?: Date;
    isSaved?: boolean;
    users?: IUserReport[];
    author?: mongoose.Schema.Types.ObjectId;
    response?:string;
}

const UserReportSchema = new mongoose.Schema<IUserReport>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ReportSchema = new mongoose.Schema<IReport>({
    type: {
        type: String,
        enum: ['user', 'post', 'content'],
        required: true,
    },
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function (this: IReport) {
            return this.type === 'user';
        },
    },
    reportedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: function (this: IReport) {
            return this.type === 'post';
        },
    },
    content: {
        type: String,
        required: function (this: IReport) {
            return this.type === 'content';
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: function (this: IReport) {
            return this.type === 'content';
        },
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
    users: {
        type: [UserReportSchema],
        required: function (this: IReport) {
            return this.type === 'post' || this.type === 'user';
        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function (this: IReport) {
            return this.type === 'content';
        },
    },
    response:{
        type: String,
    }
});

const ReportModel = mongoose.model<IReport>('Report', ReportSchema);
export default ReportModel;
