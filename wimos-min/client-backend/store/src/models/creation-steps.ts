import mongoose from 'mongoose';

interface CreationStepsAttrs {
    clientId: string;
    storeId: string;
    title: string;
    header: string;
    description: string;
    order: number;
}

interface CreationStepsModel extends mongoose.Model<any> {
    build(attrs: CreationStepsAttrs): CreationStepsDoc;
};

interface CreationStepsDoc extends mongoose.Document {
    clientId: string;
    storeId: string;
    title: string;
    header: string;
    description: string;
    order: number;
};

const creationStepsSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    stepLogo: {
        type: String,
        default: false
    },
    navigationIcon: {
        type: String,
        required: false,
    },
    order: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.status;
            delete ret.__v;
        }
    }
});

creationStepsSchema.statics.build = (attrs: CreationStepsAttrs) => {
    return new CreationSteps(attrs);
};

const CreationSteps = mongoose.model<CreationStepsDoc, CreationStepsModel>('CreationSteps', creationStepsSchema);

export { CreationSteps };