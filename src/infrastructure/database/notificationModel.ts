import mongoose, { Document, Schema, Model } from "mongoose";
import { Notification } from "../../domain/entities/Notification";

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["invitation", "other"],
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel: Model<Notification & Document> = mongoose.model<
  Notification & Document
>("Notification", NotificationSchema);

export default NotificationModel;
