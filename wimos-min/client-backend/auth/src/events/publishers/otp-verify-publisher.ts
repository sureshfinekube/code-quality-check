import {Publisher,OtpVerifyCreatedEvent,Subjects} from '@finekube/nft-client-common';

export class OtpVerifyCreatedPublisher extends Publisher<OtpVerifyCreatedEvent>{
    subject: Subjects.OtpVerifyCreatedEvent = Subjects.OtpVerifyCreatedEvent;
}