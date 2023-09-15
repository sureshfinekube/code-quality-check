import { Subjects } from "./subjects";

export interface OtpVerifyCreatedEvent {
    subject: Subjects.OtpVerifyCreatedEvent;
    data: {
        id: string;
        expiresAt: string;
    }
}