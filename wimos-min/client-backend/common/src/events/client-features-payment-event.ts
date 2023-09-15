import { Subjects } from "./subjects";

export interface ClientFeaturesPaymentEvent{
    subject: Subjects.ClientFeaturesPayment;
    data:{
        clientId: string;
        storeId: string;
        paymentId: string;
        sessionId: string;
        orderId: string;
    }
};