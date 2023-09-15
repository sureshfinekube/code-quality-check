import mongoose from "mongoose";

interface NftLikeAttrs {
  nftId: string;
  userId: string;
}

interface NftLikeModel extends mongoose.Model<NftLikeDoc> {
  build(attrs: NftLikeAttrs): NftLikeDoc;
}

interface NftLikeDoc extends mongoose.Document {
  nftId: string;
  userId: string;
}

const nftLikeSchema = new mongoose.Schema(
  {
    nftId: {
      type: String,
      required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    type: {
        type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

nftLikeSchema.statics.build = (attrs: NftLikeAttrs) => {
  return new Like(attrs);
};

const Like = mongoose.model<NftLikeDoc, NftLikeModel>(
  "nftlikes",
  nftLikeSchema
);

export { Like as NftLike };
