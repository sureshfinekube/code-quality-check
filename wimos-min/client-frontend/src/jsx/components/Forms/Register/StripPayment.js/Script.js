const API_ENDPOINT = "http://localhost:3000/page-register";

export const stripePaymentMethodHandler = async (data, cb) => {
  const { amount, result } = data;
  if (result.error) {
    // show error in payment form
    cb(result);
  } else {
    const paymentResponse = await stripePayment({
      payment_method_id: result.paymentMethod.id,
      name: result.paymentMethod.billing_details.name,
      email: result.paymentMethod.billing_details.email,
      amount: amount,
    });
    // console.log("paymentResponse", paymentResponse);
    cb(paymentResponse);
  }
};
// place backend API call for payment
const stripePayment = async (data) => {
  // const res = await fetch(`${API_ENDPOINT}/pay`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  const res = {
    id: "ch_3KlAwD2eZvKYlo2C1via2csJ",
    success: false,
    object: "charge",
    amount: 100,
    amount_captured: 0,
    amount_refunded: 0,
    application: null,
    application_fee: null,
    application_fee_amount: null,
    balance_transaction: "txn_1032HU2eZvKYlo2CEPtcnUvl",
    billing_details: {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: null,
      phone: null,
    },
    calculated_statement_descriptor: null,
    captured: false,
    created: 1649159565,
    currency: "usd",
    customer: null,
    description: "My First Test Charge (created for API docs)",
    disputed: false,
    failure_balance_transaction: null,
    failure_code: null,
    failure_message: null,
    fraud_details: {},
    invoice: null,
    livemode: false,
    metadata: {
      order_id: "6735",
    },
    on_behalf_of: null,
    order: null,
    outcome: null,
    paid: true,
    payment_intent: null,
    payment_method: "card_1KlAwC2eZvKYlo2CcftgkGdB",
    payment_method_details: {
      card: {
        brand: "visa",
        checks: {
          address_line1_check: null,
          address_postal_code_check: null,
          cvc_check: "pass",
        },
        country: "US",
        exp_month: 8,
        exp_year: 2023,
        fingerprint: "Xt5EWLLDS7FJjR1c",
        funding: "credit",
        installments: null,
        last4: "4242",
        mandate: null,
        moto: null,
        network: "visa",
        three_d_secure: null,
        wallet: null,
      },
      type: "card",
    },
    receipt_email: null,
    receipt_number: null,
    receipt_url:
      "https://pay.stripe.com/receipts/acct_1032D82eZvKYlo2C/ch_3KlAwD2eZvKYlo2C1via2csJ/rcpt_LS56i7eM3vNNAYv6JEe4s7nR504DfLR",
    redaction: null,
    refunded: false,
    refunds: {
      object: "list",
      data: [],
      has_more: false,
      url: "/v1/charges/ch_3KlAwD2eZvKYlo2C1via2csJ/refunds",
    },
    review: null,
    shipping: null,
    source_transfer: null,
    statement_descriptor: null,
    statement_descriptor_suffix: null,
    status: "succeeded",
    transfer_data: null,
    transfer_group: null,
  };
  return res;
};
