import { Subjects } from "./subjects";

export interface ClientPackageSubscribedEvent{
    subject: Subjects.ClientPackageSubscribed;
    data:{
        clientId: string;
        packageId: string;
    }
};