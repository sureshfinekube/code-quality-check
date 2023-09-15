import { Publisher, Subjects, ClientRegisteredEvent } from '@finekube/nft-client-common';

export class ClientRegisteredPublisher extends Publisher<ClientRegisteredEvent>{
    subject: Subjects.ClientRegistered = Subjects.ClientRegistered;
}