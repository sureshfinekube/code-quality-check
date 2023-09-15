import { Subjects, Publisher, createStoreEvent } from '@finekube/nft-client-common'

export class StoreCreatedPublisher extends Publisher<createStoreEvent> {
    subject: Subjects.StoreCreated = Subjects.StoreCreated;
};