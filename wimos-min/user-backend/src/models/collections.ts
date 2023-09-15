import mongoose from 'mongoose';

interface CollectionAttrs {
    userId: string;
    storeId: string;
    name: string;
    description: string;
    category: string;
    profileImage: string;
    bannerImage: string;
    url: string;
    royalities: number;
};

interface CollectionModel extends mongoose.Model<CollectionDoc> {
    build(attrs: CollectionAttrs): CollectionDoc;
};

interface CollectionDoc extends mongoose.Document {
    userId: string;
    storeId: string;
    name: string;
    description: string;
    category: string;
    profileImage: string;
    bannerImage: string;
    url: string;
    isHidden: boolean;
    royalities: number;
};

const collectionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    profileImage: {
        type: String,
        required: false,
        default:null
    },
    bannerImage: {
        type: String,
        required: false,
        default:null
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    royalities: {
        type: Number,
        default: 0
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
});

collectionSchema.statics.build = (attrs: CollectionAttrs) => {
    return new Collection(attrs);
};

const Collection = mongoose.model<CollectionDoc, CollectionModel>('Collections', collectionSchema);

export { Collection };