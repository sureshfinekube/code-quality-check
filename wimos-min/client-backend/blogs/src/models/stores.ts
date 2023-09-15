import mongoose from 'mongoose';

interface StoresAttrs {
    clientId: string;
    storeId: string;
};

interface StoreModel extends mongoose.Model<any> {
    build(attrs: StoresAttrs): StoresDoc;
};

interface StoresDoc extends mongoose.Document {
    clientId: string;
    storeId: string;
    createdAt: string;
};

const StoreSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
        default: new Date()
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret._id
        }
    }
});

StoreSchema.statics.build = (attrs: StoresAttrs) => {
    return new Stores(attrs);
};

const Stores = mongoose.model<StoresDoc, StoreModel>('Stores', StoreSchema);

export { Stores };