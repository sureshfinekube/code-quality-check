import mongoose from 'mongoose';

interface NotificationSettingsAttrs {
    userId: string;
    endBid: boolean;
    nftPurchase: boolean;
    newBid: boolean;
    likeAndFollow: boolean;
};

interface NotificationSettingsModel extends mongoose.Model<NotificationSettingsDoc> {
    build(attrs: NotificationSettingsAttrs): NotificationSettingsDoc;
};

interface NotificationSettingsDoc extends mongoose.Document {
    userId: string;
    endBid: boolean;
    nftPurchase: boolean;
    newBid: boolean;
    likeAndFollow: boolean;
};

const notificationSettingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    endBid: {
        type: Boolean,
        required: true
    },
    nftPurchase: {
        type: Boolean,
        required: true
    },
    newBid: { 
        type: Boolean,
        required: true
    },
    likeAndFollow: {
        type: Boolean,
        required: true
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

notificationSettingsSchema.statics.build = (attrs: NotificationSettingsAttrs) => {
    return new NotificationSettings(attrs);
};

const NotificationSettings = mongoose.model<NotificationSettingsDoc, NotificationSettingsModel>('notificationSettingss', notificationSettingsSchema);

export { NotificationSettings };