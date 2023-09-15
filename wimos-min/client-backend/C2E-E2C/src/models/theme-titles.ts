import mongoose from 'mongoose';

interface ThemeTitlesAttrs {
    clientId: string;
    storeId: string;
    type: string;
    title: string;
}

interface ThemeTitlesModel extends mongoose.Model<any> {
    build(attrs: ThemeTitlesAttrs): ThemeTitlesDoc;
};

interface ThemeTitlesDoc extends mongoose.Document {
    clientId: string;
    storeId: string;
    type: string;
    title: string;
};

const themeTitlesSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['firstSlider'],
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
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

themeTitlesSchema.statics.build = (attrs: ThemeTitlesAttrs) => {
    return new ThemeTitles(attrs);
};

const storeDb = mongoose.connection.useDb('store-db');
const ThemeTitles = storeDb.model<ThemeTitlesDoc, ThemeTitlesModel>('ThemeTitles', themeTitlesSchema);

export { ThemeTitles };