import { Subjects } from "./subjects";

export interface sharedStoreCreateEvent {
    subject: Subjects.SharedStoreCreated;
    data: {
        clientId: string;
        packageId: string;
    };
};
