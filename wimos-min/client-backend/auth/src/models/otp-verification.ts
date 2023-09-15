import mongoose from 'mongoose';

type statusModel = 'pending' | 'successfull';

interface OtpVerificationAttrs {
    clientId: string;
    status: statusModel;
    verified: boolean;
    otp: string;
    expiresAt: Date;
};

interface OtpVerificationModel extends mongoose.Model<any> {
    build(attrs: OtpVerificationAttrs): OtpVerificationDoc;
};

interface OtpVerificationDoc extends mongoose.Document {
    clientId: string;
    status: statusModel;
    verified: boolean;
    otp: string;
};

const otpVerificationSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.otp;
            delete ret.__v;
            delete ret._id;
        }
    }
});

otpVerificationSchema.statics.build = (attrs: OtpVerificationAttrs) => {
    return new OtpVerification(attrs);
};

const OtpVerification = mongoose.model<OtpVerificationDoc, OtpVerificationModel>('OtpVerification', otpVerificationSchema);

export { OtpVerification };