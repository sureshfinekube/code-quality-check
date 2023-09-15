import mongoose from "mongoose";

interface NotificationAttrs {
    userId: string,
    type: string,
    title: string,
    description: string,
    redirectType: string,
    redirectId: string,
    image: string | null,
    userImage: string | null
}

interface NotificationModel extends mongoose.Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

interface NotificationDoc extends mongoose.Document {
    userId: string,
    type: string,
    title: string,
    description: string,
    icon: string;
    isRead: boolean;
    isCleared: boolean;
    image: string | null
}

const notificationSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['buy','like','follow','gift']
    },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
    },
    icon: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true
    },
    isCleared: {
       type: Boolean,
       default: false,
       required: true 
    },
    redirectType: {
        type: String
    },
    redirectId: {
        type: String
    },
    image: {
      type: String
    },
    userImage: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.isCleared
      },
    },
  }
);

notificationSchema.statics.build = (attrs: NotificationAttrs) => {
  return new Notifications(attrs);
};

const Notifications = mongoose.model<NotificationDoc, NotificationModel>(
  "notifications",
  notificationSchema
);

export { Notifications };
