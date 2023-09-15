import mongoose from 'mongoose';

interface NftAttrs {
    userId: Array<string>;
    storeId: string;
    collectionId: string;
    name: string;
    description: string;
    tokenId: string;
    address: string;
    uri: string;
    createdBy: string;
    mintFrom: string;
    properties: Array<any>;
    unlockableContent: string;
    numberOfCopies: number;
    tokenStandard: string | null;
    ownersDetails: Array<any>;
    isFirstSale: boolean;
    // royalities: number;
    // tokenIdForLazyMint: number | null | undefined;
};

interface NftModel extends mongoose.Model<NftDoc> {
    build(attrs: NftAttrs): NftDoc;
};

interface NftDoc extends mongoose.Document {
    userId: Array<string>;
    storeId: string;
    name: string;
    description: string;
    tokenId: string;
    address: string;
    uri: string;
    mintFrom: string;
    type: 'auction' | 'fixed' | 'bid';
    price: string;
    startingPrice: string;
    endDate: string;
    endTime: string;
    createdBy: string;
    status: boolean;
    listed: boolean;
    properties: Array<any>;
    unlockableContent: string;
    numberOfCopies: number;
    tokenStandard: string | null;
    ownersDetails: Array<any>;
    listings: Array<any>;
    bidOffers: Array<any>;
    auctionOffers: Array<any>;
    likes_count: number;
    isFirstSale: boolean;
    isAuctionEnded: boolean;
    isAuctionCompletelyEnded: boolean;
    isLazyMint: boolean;
    salesId: number;
    auctionId: number;
    signer: Array<any>;
    tokenIdForLazyMint: number;
    mainListingId: string;
    offers: Array<any>;
};

const nftSchema = new mongoose.Schema({
    userId: { // current owner (it will be one element if it is erc721 token, when it is erc1155 token there will be chance to )
        type: Array,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    collectionId: {
        type: String,
        required: true,
        ref: 'Collections'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tokenId: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
    mintFrom: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: null,
        enum: ['fixed','bid','auction',null]
    },
    numberOfCopies: {
        type: Number,
        // default: 1
    },
    // royalities: {
    //     type: Number,
    //     default: 0
    // },
    price: {
        type: Number,
        default: 0
    },
    startingPrice: {
        type: Number,
        default: 0
    },
    endDate: {
        type: Date,
        default: null
    },
    endTime: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    listed: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    properties: {
        type: Array,
    },
    unlockableContent: {
        type: String,
    },
    tokenStandard: {
        type: String
        // erc721, erc1155
    },
    ownersDetails: {
        type: Array
    },
    listings: [{
        unitPrice: Number,
        quantity: Number,
        fromUserId: String,
        fromMetamaskId: String,
        salesId: String,
        endDate: Date
    }],
    bidOffers: [{
        userId: String,
        price: Number,
        endDate: Date,
    }],
    auctionOffers: [{
        userId: String,
        userMetamaskId: String,
        price: Number,
    }],
    isFirstSale: {
        type: Boolean
    },
    likes_count: {
        type: Number,
        default: 0
    },
    activeStatus: {
        type: Boolean,
        default: true
    },
    isAuctionEnded: {
        type: Boolean
    },
    isAuctionCompletelyEnded: {
        type: Boolean
    },
    isLazyMint: {
        type: Boolean
    },
    salesId: {
        type: String
    },
    auctionId: {
        type: String
    },
    signer: {
        type: Object
    },
    signature: {
        type: Array
    },
    isFixedSaleEnded: {
        type: Boolean
    },
    mainListingId: {
        type: String
    },
    offers: [{
        userId: String,
        price: Number,
        endDate: Date,
        copies: Number,
        count: Number
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

nftSchema.statics.build = (attrs: NftAttrs) => {
    return new NFT(attrs);
};

const NFT = mongoose.model<NftDoc, NftModel>('nft', nftSchema);

export { NFT as NftCollection };