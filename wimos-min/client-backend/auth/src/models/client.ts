import mongoose from 'mongoose';

interface ClientAttrs {
    name: string;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    phone_code: string;
    nationality: string;
    address: string;
    isFreePackageClient: boolean;
    createdAt: Date;
    updatedAt: Date;
}


interface ClientModel extends mongoose.Model<any> {
    build(attrs: ClientAttrs): ClientDoc;
};

interface ClientDoc extends mongoose.Document {
    name: string;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    phone_code: string;
    nationality: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    status: boolean,
    role: number;
};

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    phone_code: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    packageId:{
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    currentStep:{
        type: Number,
        default: 1
    },
    role: {
        type: Number,
        default: 2
    },
    isFreePackageClient: {
        type: Boolean
    },
    freePackageStartingDate: {
        type: Date
    },
    freePackageEndingDate: {
        type: Date
    },
    isFreePackageExpired: {
        type: Boolean
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.status;
            delete ret.role;
        }
    }
});

clientSchema.statics.build = (attrs: ClientAttrs) => {
    return new Client(attrs);
};

const Client = mongoose.model<ClientDoc, ClientModel>('Client', clientSchema);


export { Client };