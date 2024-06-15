import { Schema, model } from 'mongoose';

interface BannedPost {
  postId: string;
  reason: string;
  timestamp?: Date; 
}

const reportFeedbackSchema = new Schema<BannedPost>({
  postId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ReportFeedbackModel = model<BannedPost>('reportFeedback', reportFeedbackSchema);

export default ReportFeedbackModel;
