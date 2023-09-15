import { Subjects } from "./subjects";

export interface OtpExpirationCompleteEvent {
    subject: Subjects.OtpExpirationComplete;
    data: {
        id: string;
    }
}