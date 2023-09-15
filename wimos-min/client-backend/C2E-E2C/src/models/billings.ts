import mongoose from 'mongoose';

type PaymentStatus = 'pending' | 'success' | 'failed' | 'expired';
type PaymentMode = 'subscription' | 'one_time';

interface BillingAttrs {
    clientId: string;
    sessionId: string;
    payment_status: PaymentStatus;
    packageId: string;
    stripe_customer_id: string;
    amount: string;
    amount_sub_total: string;
    mode: PaymentMode;
    stripe_product_id: string;
    stripe_price_id: string;
};

interface BillingModel extends mongoose.Model<any> {
    build(attrs: BillingAttrs): BillingDoc;
};

interface BillingDoc extends mongoose.Document {
    clientId: string;
    sessionId: string;
    payment_status: PaymentStatus;
    packageId: string;
    stripe_customer_id: string;
    amount: string;
    amount_sub_total: string;
    mode: PaymentMode;
    stripe_product_id: string;
    stripe_price_id: string;
};

const billingSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    packageId: {
        type: String,
        required: true
    },
    stripe_customer_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    amount_sub_total: {
        type: String,
        required: true
    },
    updated_on: {
        type: Date,
        default: new Date()
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    card_details: {
        type: Object,
        required: false
    },
    mode: {
        type: String,
        required: true
    },
    stripe_product_id: {
        type: String,
        required: true
    },
    stripe_price_id: {
        type: String,
        required: true
    },
    subscription_id: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: false
    },
    expires_at: {
        type: Date,
        required: false
    },
    starts_at: {
        type: Date,
        required: false
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

billingSchema.statics.build = (attrs: BillingAttrs) => {
    return new Billing(attrs);
};

let paymentsDb = mongoose.connection.useDb('payments-db');
const Billing = paymentsDb.model<BillingDoc, BillingModel>('Billings', billingSchema);

export { Billing };