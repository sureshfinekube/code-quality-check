import { Subjects } from "./subjects";

export interface SaveAbiBytecodeEvent {
    subject: Subjects.SaveAbiBytecode;
    data: {
        clientId: string;
        storeId: string;
        erc721: object;
        marketplace: object;
    };
};
