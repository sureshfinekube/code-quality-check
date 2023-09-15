import mongoose from 'mongoose';

interface TokenIdSalesIdAuctionIdAttrs {
    type: 'tokenId' | 'salesId' | 'auctionId';
    contractType: 'marketplace' | 'single_store',
    storeId: string | null,
    clientId: string | null,
    counter: number,
};

interface TokenIdSalesIdAuctionIdModel extends mongoose.Model<TokenIdSalesIdAuctionIdDoc> {
    build(attrs: TokenIdSalesIdAuctionIdAttrs): TokenIdSalesIdAuctionIdDoc;
};

interface TokenIdSalesIdAuctionIdDoc extends mongoose.Document {
    type: 'tokenId' | 'salesId' | 'auctionId';
    contractType: 'marketplace' | 'single_store',
    storeId: string | null,
    clientId: string | null,
    counter: number,
};

const tokenIdSalesIdAuctionIdSchema = new mongoose.Schema({
    contractType: {
        type: String,
        enum: ['marketplace', 'single_store'],
        required: [true, 'contractType is required']
    },
    type: {
        type: String,
        enum: ['tokenId', 'salesId', 'auctionId'],
        required: [true, 'type is required']
    },
    storeId: {
        type: String,
    },
    clientId: {
        type: String
    },
    counter: {
        type: Number,
        default: 1,
        required: true
    },
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

tokenIdSalesIdAuctionIdSchema.statics.build = (attrs: TokenIdSalesIdAuctionIdAttrs) => {
    return new TokenIdSalesIdAuctionId(attrs);
};

const TokenIdSalesIdAuctionId = mongoose.model<TokenIdSalesIdAuctionIdDoc, TokenIdSalesIdAuctionIdModel>('TokenIdSalesIdAuctionId', tokenIdSalesIdAuctionIdSchema);

export { TokenIdSalesIdAuctionId };