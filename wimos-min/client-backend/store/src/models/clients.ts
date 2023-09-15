import mongoose from 'mongoose';

interface ClientAttrs {
    clientId: string;
    username: string;
    email: string;
};

interface ClientModel extends mongoose.Model<any> {
    build(attrs: ClientAttrs): ClientDoc;
};

interface ClientDoc extends mongoose.Document {
    clientId: string;
    username: string;
    email: string;
    createdAt: string;
};

const clientSchema = new mongoose.Schema({
    clientId: {
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
    createdAt: {
        type: String,
        required: true,
        default: new Date()
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret._id
        }
    }
});

clientSchema.statics.build = (attrs: ClientAttrs) => {
    return new Client(attrs);
};

const Client = mongoose.model<ClientDoc, ClientModel>('Client', clientSchema);

export { Client };