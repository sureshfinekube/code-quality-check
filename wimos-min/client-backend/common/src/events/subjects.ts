export enum Subjects {
    ClientRegistered = 'client:registered',
    ContractCreated = 'contract:created',
    PackageCreated = 'package:created',
    StoreCreated = 'store:created',
    ClientPackageSubscribed = 'client:package:subscribed',
    
    OtpVerifyCreatedEvent = 'otp-verify-event:created',
    OtpExpirationComplete = 'otp-expiration:complete',
    
    ClientFeaturesPayment = 'client:features:payment',

    SaveAbiBytecode = 'SaveAbiBytecode:contract:compiled',

    SharedStoreCreated = 'shared-store:created'
}