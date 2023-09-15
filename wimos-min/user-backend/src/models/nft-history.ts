import mongoose from "mongoose";

interface NftHistoryAttrs {
  nftId: string;
}

interface NftHistoryModel extends mongoose.Model<NftHistoryDoc> {
  build(attrs: NftHistoryAttrs): NftHistoryDoc;
}

interface NftHistoryDoc extends mongoose.Document {
  nftId: string;
  events: Array<{}>;
}

const nftHistorySchema = new mongoose.Schema(
  {
    nftId: {
      type: String,
      required: true,
    },
    events: [
      {
        eventName: {
          type: String,
          required: true,
          enum: ["mint", "sell", "buy","gift"],
        },
        userId: {
          type: String,
          ref: 'User'
        },
        fromMetamaskId: {
          type: String,
        },
        toMetamaskId: {
          type: String,
        },
        amount: {
          type: String,
        },
        previousOwnerId: {
          type: String,
          ref: 'User'
        },
        numberOfCopies: {
          type: Number
        },
        date: {
            type: Date
        }
      },
    ],
    status: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

nftHistorySchema.statics.build = (attrs: NftHistoryAttrs) => {
  return new History(attrs);
};

const History = mongoose.model<NftHistoryDoc, NftHistoryModel>(
  "nfthistory",
  nftHistorySchema
);

export { History as NftHistory };
