import mongoose from 'mongoose';

interface ReportAttrs {
    reportingUserId: string;
    storeId: string;
    type: 'nft' | 'user';
    subject: string;
    message: string | null;
};

interface ReportModel extends mongoose.Model<ReportDoc> {
    build(attrs: ReportAttrs): ReportDoc;
};

interface ReportDoc extends mongoose.Document {
    reportingUserId: string;
    storeId: string;
    type: 'nft' | 'user';
    nftId: string | null;
    userId: string | null;
    subject: string;
    message: string | null;
};

const reportSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    reportingUserId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['nft','user']
    },
    nftId: {
        type: String
    },
    userId: { 
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
    }
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

reportSchema.statics.build = (attrs: ReportAttrs) => {
    return new REPORTS(attrs);
};

const REPORTS = mongoose.model<ReportDoc, ReportModel>('reports', reportSchema);

export { REPORTS };