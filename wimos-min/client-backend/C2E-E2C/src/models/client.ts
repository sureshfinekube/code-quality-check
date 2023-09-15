import mongoose from 'mongoose';

interface ClientAttrs {
    name: string;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    phone_code: string;
    nationality: string;
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
        default: false
    },
    currentStep:{
        type: Number,
        default: 1
    },
    role: {
        type: Number,
        default: 2
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret.role;
        }
    }
});

clientSchema.statics.build = (attrs: ClientAttrs) => {
    return new Client(attrs);
};

const authDb = mongoose.connection.useDb('auth-db');
const Client = authDb.model<ClientDoc, ClientModel>('Client', clientSchema);


export { Client };