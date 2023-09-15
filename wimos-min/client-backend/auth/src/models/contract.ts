import mongoose from 'mongoose';

interface CreateApiContractAttrs {
    userId: string;
    nftContract: object;
    marketPlaceContract: object;
}


interface ClientModel extends mongoose.Model<any> {
    build(attrs: CreateApiContractAttrs): CreateApiContractDoc;
};

interface CreateApiContractDoc extends mongoose.Document {
    userId: string;
    nftContract: object;
    marketPlaceContract: object;
};

const createApiContractSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    storeId: {
        type: String
    },
    chainId: {
        type: String
    },
    nftContract: {
        contract_address: {
            type: String,
            required: false
        },
        abi: {
            type: Array,
            required: true
        },
        bytecode: {
            type: Object,
            required: false
        }
    },
    marketPlaceContract: {
        contract_address: {
            type: String,
            required: false
        },
        abi: {
            type: Array,
            required: true
        },
        bytecode: {
            type: Object,
            required: false
        }
    },
    realMarketplaceContractAddress: {
        contract_address: {
            type: String,
        }
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

createApiContractSchema.statics.build = (attrs: CreateApiContractAttrs) => {
    return new CreateApiContract(attrs);
};

const CreateApiContract = mongoose.model<CreateApiContractDoc, ClientModel>('CreateApiContract', createApiContractSchema);


export { CreateApiContract };