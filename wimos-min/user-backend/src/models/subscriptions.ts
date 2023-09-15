import mongoose from "mongoose";

interface SubscriptionAttrs {
    userId: string;
    endpoint: string,
    expirationTime: number,
    keys: {
      p256dh: string,
      auth: string,
    },
}

interface SubscriptionModel extends mongoose.Model<SubscriptionDoc> {
  build(attrs: SubscriptionAttrs): SubscriptionDoc;
}

interface SubscriptionDoc extends mongoose.Document {
  userId: string;
  endpoint: string,
  expirationTime: number,
  keys: {
    p256dh: string,
    auth: string,
  },
}

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    endpoint: {
      type: String,
      required: true,
    },
    expirationTime: {
      type: Number,
    },
    keys: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

subscriptionSchema.statics.build = (attrs: SubscriptionAttrs) => {
  return new Subscription(attrs);
};

const Subscription = mongoose.model<SubscriptionDoc, SubscriptionModel>(
  "subscription",
  subscriptionSchema
);

export { Subscription };
