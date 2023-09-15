import mongoose from 'mongoose';


interface UserAttrs {
    metamaskId: string;
    storeId: string;
};

interface WishlistAttrs {
    nftId: string;
    date: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
};

interface UserDoc extends mongoose.Document {
    metamaskId: string;
    storeId: string;
    email: string;
    name: string;
    profile: string;
    username: string;
    wishlist: Array<WishlistAttrs>;
};

const userSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    metamaskId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    username: {
        type: String,
        required: false,
        default: null
    },
    bio: {
        type: String,
        required: false,
        default: ""
    },
    profile: {
        type: String,
        default: ""
    },
    cover: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: true
    },
    follower_count: {
        type: Number,
        default: 0,
        min: [0, 'Must be at least 0, got {VALUE}']
    },
    following_count: {
        type: Number,
        default: 0,
        min: [0, 'Must be at least 0, got {VALUE}']
    },
    wishlist: [{
        nftId: {
            type: String,
            required: true,
            ref: 'nft'
        },
        addedAt: {
            type: Date,
        }
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
}
);

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
