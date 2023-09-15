import mongoose from 'mongoose';

interface BidsAttrs {
    userId: string;
    storeId: string;
    nftId: string;
    price: string;
};

interface BidModel extends mongoose.Model<BidDoc> {
    build(attrs: BidsAttrs): BidDoc;
};

interface BidDoc extends mongoose.Document {
    userId: string;
    storeId: string;
    nftId: string;
    price: string;
    expire_date: string;
    updatedOn: string;
};

const bidSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    nftId: {
        type: String,
        required: true
    },
    expire_date: {
        type: Date,
        default: null
    },
    updatedOn: {
        type: String,
        default: new Date()
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});


bidSchema.statics.build = (attrs: BidsAttrs) => {
    return new Bid(attrs);
};

const Bid = mongoose.model<BidDoc, BidModel>('Bid', bidSchema);


export { Bid }