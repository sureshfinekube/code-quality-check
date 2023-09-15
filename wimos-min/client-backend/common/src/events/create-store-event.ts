import { Subjects } from "./subjects";

export interface createStoreEvent {
    subject: Subjects.StoreCreated;
    data: {
        clientId: string;
        store_data: {
            id: string;
        };
    };
};
