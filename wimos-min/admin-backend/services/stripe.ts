import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51LSxGPSBLxKdIK7GSxmPXmZxS6NISGyLWYZOSGdCbeOHzu1FUm5wDk3KWk3P8FBVVhV7soj7zFhPrKwjAazEDjnC00KTBw4elq", {
    apiVersion: '2020-08-27'
});

export class StripeController {

    static async createStripeAccount(
        {
            name,
            type,
            amount
        }
    ) {

        try {
            const product = await stripe.products.create({
                name: name,
                default_price_data: {
                    unit_amount: amount * 100,
                    currency: 'usd',
                    recurring: { interval: type === "monthly_subscription" ? 'month' : "year" },
                },
                expand: ['default_price'],
            });
            return { status: true, product };
        }
        catch (err) {
            // console.log('errr',err)
            return { status: false }
        }

    }
}