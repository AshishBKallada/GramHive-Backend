import { Schema, model } from "mongoose";
import { LiveStreamData } from "../../../../domain/entities/livedata";

const LiveStreamDataSchema = new Schema<LiveStreamData>({
  userId: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => value.length > 0,
      message: "userId is required",
    },
  },
  roomID: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => value.length > 0,
      message: "roomID is required",
    },
  },
});

export const LiveModel = model<LiveStreamData>("Live", LiveStreamDataSchema);
