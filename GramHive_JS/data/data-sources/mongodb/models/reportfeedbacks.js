"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportFeedbackSchema = new mongoose_1.Schema({
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
const ReportFeedbackModel = (0, mongoose_1.model)('reportFeedback', reportFeedbackSchema);
exports.default = ReportFeedbackModel;
