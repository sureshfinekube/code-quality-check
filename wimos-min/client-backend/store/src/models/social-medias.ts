import mongoose from 'mongoose';

interface SocialMediaAttrs {
    clientId: string | null | undefined;
    storeId: string | null;
    name: string | null;
    link: string | null;
    image: string | null;
}

interface SocialMediaModel extends mongoose.Model<any> {
    build(attrs: SocialMediaAttrs): SocialMediaDoc;
};

interface SocialMediaDoc extends mongoose.Document {
    clientId: string;
    storeId: string;
    name: string;
    link: string;
    image: string;
};

const socialMediaSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.createdAt;
            // delete ret.updatedAt;
            delete ret.status;
            delete ret.__v;
        }
    }
});

socialMediaSchema.statics.build = (attrs: SocialMediaAttrs) => {
    return new SocialMedia(attrs);
};

const SocialMedia = mongoose.model<SocialMediaDoc, SocialMediaModel>('SocialMedia', socialMediaSchema);

export { SocialMedia };