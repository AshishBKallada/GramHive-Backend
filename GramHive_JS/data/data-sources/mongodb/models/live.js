"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveModel = void 0;
const mongoose_1 = require("mongoose");
const LiveStreamDataSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 0,
            message: "userId is required",
        },
    },
    roomID: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 0,
            message: "roomID is required",
        },
    },
});
exports.LiveModel = (0, mongoose_1.model)("Live", LiveStreamDataSchema);
