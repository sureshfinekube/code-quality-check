import mongoose from "mongoose";

interface UserFollowAttrs {
  followerUserId: string;
  followingUserId: string;
}

interface UserFollowModel extends mongoose.Model<UserFollowDoc> {
  build(attrs: UserFollowAttrs): UserFollowDoc;
}

interface UserFollowDoc extends mongoose.Document {
  followerUserId: string;
  followingUserId: string;
}

const UserFollowSchema = new mongoose.Schema(
  {
    followerUserId: { // The person who is following (1st person)
      type: String,
      required: true,
    },
    followingUserId: { // (2nd person)
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
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

UserFollowSchema.statics.build = (attrs: UserFollowAttrs) => {
  return new Follow(attrs);
};

const Follow = mongoose.model<UserFollowDoc, UserFollowModel>(
  "UserFollow",
  UserFollowSchema
);

export { Follow as UserFollow };
