import mongoose from 'mongoose';

interface VerificationClientAttrs {
    status: statusModel;
    verified: boolean;
    otp: string;
    client_data: {
        name: string;
        username: string;
        email: string;
        password: string;
        phone_number: string;
        phone_code: string;
        nationality: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
    }
    expiresAt: Date;
}

interface VerificationModel extends mongoose.Model<any> {
    build(attrs: VerificationClientAttrs): VerificationClientDoc;
};

type statusModel = 'pending' | 'successfull';

interface VerificationClientDoc extends mongoose.Document {
    status: statusModel;
    verified: boolean;
    otp: string;
    client_data: {
        name: string;
        username: string;
        email: string;
        password: string;
        phone_number: string;
        phone_code: string;
        nationality: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
    }
    expiresAt: Date;
};


const verificationClientSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    otp: {
        type: String,
        required: true
    },
    client_data: {
        type: Object,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.client_data;
            delete ret.otp;
        }
    }
});

verificationClientSchema.statics.build = (attrs: VerificationClientAttrs) => {
    return new VerificationClient(attrs);
};

const VerificationClient = mongoose.model<VerificationClientDoc, VerificationModel>('Verification-Client', verificationClientSchema);

export { VerificationClient };