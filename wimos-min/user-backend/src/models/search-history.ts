import mongoose from "mongoose";

interface SearchHistoryAttrs {
    userId: string;
    storeId: string;
    keyword: string;
    nftId: string;
}

interface SearchHistoryModel extends mongoose.Model<SearchHistoryDoc> {
  build(attrs: SearchHistoryAttrs): SearchHistoryDoc;
}

interface SearchHistoryDoc extends mongoose.Document {
    userId: string;
    storeId: string;
    keyword: string;
    nftId: string;
}

const searchHistorySchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    storeId: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    nftId: {
      type: String,
      required: true,
    }
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

searchHistorySchema.statics.build = (attrs: SearchHistoryAttrs) => {
  return new SearchHistory(attrs);
};

const SearchHistory = mongoose.model<SearchHistoryDoc, SearchHistoryModel>(
  "searchHistory",
  searchHistorySchema
);

export { SearchHistory };
