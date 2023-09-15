import mongoose from 'mongoose';

interface BlogAttrs {
    clientId: string;
    storeId: string;
    title: string;
    readTime: string;
    imageTitle: string;
    heading: string;
    description: string;
    metaTags: string[];
    metaDescription: string;
    tags: string[];
    status: boolean;
    relatedPosts: Array<any>;
    categoryId: string | null;
};

interface BlogModel extends mongoose.Model<any> {
    build(attrs: BlogAttrs): BlogDoc;
};

interface BlogDoc extends mongoose.Document {
    clientId: string;
    storeId: string;
    title: string;
    readTime: string;
    imageTitle: string;
    heading: string;
    description: string;
    metaTags: string[];
    metaDescription: string;
    tags: string[];
    status: boolean;
    relatedPosts: Array<any>;
    categoryId: string;
};

const blogSchema = new mongoose.Schema({
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
    imageTitle: {
        type: String,
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    metaTags: {
        type: Array,
    },
    metaDescription: {
        type: String,
    },
    tags: {
        type: Array,
    },
    imageName: {
        type: String,
        default: "default-banner.jpg"
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: false
    },
    relatedPosts: [{
        type: mongoose.Types.ObjectId,
        default: []
    }],
    readTime: {
        type: String
    },
    categoryId: {
        type: String
    }
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

blogSchema.statics.build = (attrs: BlogAttrs) => {
    return new Blog(attrs);
};

const Blog = mongoose.model<BlogDoc, BlogModel>('Blogs', blogSchema);

export { Blog };