import mongoose from 'mongoose';

interface ProxyContractAttrs {
    proxyContract: object;
}


interface ProxyContractModel extends mongoose.Model<any> {
    build(attrs: ProxyContractAttrs): ProxyContractDoc;
};

interface ProxyContractDoc extends mongoose.Document {
    proxyContract: object;
};

const proxyContractSchema = new mongoose.Schema({
        // contract_address: {
        //     type: String,
        // },
        abi: {
            type: Array,
        },
        byteCode: {
            type: Object,
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

proxyContractSchema.statics.build = (attrs: ProxyContractAttrs) => {
    return new ProxyContract(attrs);
};

const ProxyContract = mongoose.model<ProxyContractDoc, ProxyContractModel>('ProxyContract', proxyContractSchema);


export { ProxyContract };