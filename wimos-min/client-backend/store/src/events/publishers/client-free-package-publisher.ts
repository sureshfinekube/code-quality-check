import { Subjects, Publisher, sharedStoreCreateEvent } from '@finekube/nft-client-common'

export class ClientFreePackagePublisher extends Publisher<sharedStoreCreateEvent> {
    subject: Subjects.SharedStoreCreated = Subjects.SharedStoreCreated;
};