// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(
  "sk_test_51KkjsXSIXjbMAn0t0inbR2i3NiS31WnivpH0sypAPyI3vEW8zlQbAMbhzud8JiNPMqO5fAvU7Kb5w4OokagGGu7W00MZvDhegx"
);

app.post("/create-subscription", async (req, res) => {
  const customerId = req.cookies["customer"];
  const priceId = "price_1L11VnSIXjbMAn0t9vIAkZvz";

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});
