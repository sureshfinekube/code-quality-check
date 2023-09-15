import mongoose from 'mongoose';

interface BlogCategoryAttrs {
    clientId: string | null | undefined;
    storeId: string;
    title: string;
};

interface BlogCategoryModel extends mongoose.Model<any> {
    build(attrs: BlogCategoryAttrs): BlogCategoryDoc;
};

interface BlogCategoryDoc extends mongoose.Document {
    clientId: string;
    storeId: string;
    title: string;
};

const blogCategorySchema = new mongoose.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.createdAt;
            delete ret.__v;
        }
    }
});

blogCategorySchema.statics.build = (attrs: BlogCategoryAttrs) => {
    return new BlogCategories(attrs);
};

const BlogCategories = mongoose.model<BlogCategoryDoc, BlogCategoryModel>('BlogCategories', blogCategorySchema);

export { BlogCategories };