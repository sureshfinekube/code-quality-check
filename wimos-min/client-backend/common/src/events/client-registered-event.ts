import { Subjects } from "./subjects";

export interface ClientRegisteredEvent {
    subject: Subjects.ClientRegistered;
    data: {
        clientId: string;
        email: string;
        username: string;
        address: string;
    };
};