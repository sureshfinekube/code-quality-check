import mongoose from 'mongoose';

interface SharedContractAbisDocAttrs {
    userId: string;
    nftContract: object;
    marketPlaceContract: object;
}


interface SharedContractAbiModel extends mongoose.Model<any> {
    build(attrs: SharedContractAbisDocAttrs): sharedContractAbisDoc;
};

interface sharedContractAbisDoc extends mongoose.Document {
    userId: string;
    nftContract: object;
    marketPlaceContract: object;
};

const sharedContractAbisSchema = new mongoose.Schema({
    nftContract: {
        contract_address: {
            type: String,
            required: true
        },
        abi: {
            type: Array,
            required: true
        }
    },
    marketPlaceContract: {
        contract_address: {
            type: String,
            required: true
        },
        abi: {
            type: Array,
            required: true
        }
    },
    chainId: {
        type: String
    },
    type: {
        type: String,
        enum: ['erc721','erc1155','combinedContract']
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

sharedContractAbisSchema.statics.build = (attrs: SharedContractAbisDocAttrs) => {
    return new SharedContractAbis(attrs);
};

const authDb = mongoose.connection.useDb('auth-db');

const SharedContractAbis = authDb.model<sharedContractAbisDoc, SharedContractAbiModel>('SharedContractAbis', sharedContractAbisSchema);

export { SharedContractAbis };