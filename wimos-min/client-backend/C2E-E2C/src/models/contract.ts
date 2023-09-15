import mongoose from 'mongoose';

export const votesOptions = ['erc20votes', 'erc721votes', 'comp'] as const;
export type VotesOptions = typeof votesOptions[number];
export const timelockOptions = [false, 'openzeppelin', 'compound'] as const;
export type TimelockOptions = typeof timelockOptions[number];

type ACCESSCONTROL = 'ownable' | 'roles';

type Upgradeability = ' transparent' | 'uups' | false;

interface Info {
    securityContact?: string;
    license?: string;
};


interface ContractAttrs {
    storeId: string;
    userId: string;
    ERC20: boolean;
    ERC721: boolean;
    ERC1155: boolean;
    Governor: boolean;
    ERC20Data?: {
        accessControl: ACCESSCONTROL;
        upgradeability: Upgradeability;
        Info: Info;
        name: string;
        symbol: string;
        burnable?: boolean;
        snapshots?: boolean;
        pausable?: boolean;
        premint?: string;
        mintable?: boolean;
        permit?: boolean;
        votes?: boolean;
        flashmint?: boolean;
    };
    ERC721Data?: {
        accessControl: ACCESSCONTROL;
        upgradeability: Upgradeability;
        Info: Info;
        name: string;
        symbol: string;
        baseUri?: string;
        enumerable?: boolean;
        uriStorage?: boolean;
        burnable?: boolean;
        pausable?: boolean;
        mintable?: boolean;
        incremental?: boolean;
        votes?: boolean;
    };
    ERC1155Data?: {
        accessControl: ACCESSCONTROL;
        upgradeability: Upgradeability;
        Info: Info;
        name: string;
        uri: string;
        burnable?: boolean;
        pausable?: boolean;
        mintable?: boolean;
        supply?: boolean;
    };
    GovernorData?: {
        upgradeability: Upgradeability;
        Info: Info
        name: string;
        delay: string;
        period: string;
        blockTime?: number;
        proposalThreshold?: string;
        decimals?: number;
        quorumMode: 'percent' | 'absolute';
        quorumPercent?: number;
        quorumAbsolute?: string;
        votes: VotesOptions;
        timelock: TimelockOptions;
        bravo?: boolean;
        settings?: boolean;
    }
};
interface ContractModel extends mongoose.Model<any> {
    build(attrs: ContractAttrs): ContractDoc;
};
interface ContractDoc extends mongoose.Document {
    storeId: string;
    userId: string;
    ERC20: boolean;
    ERC721: boolean;
    ERC1155: boolean;
    Governor: boolean;
    ERC20Data?: {
        accessControl: ACCESSCONTROL;
        upgradeability: Upgradeability;
        Info: Info
        name: string;
        symbol: string;
        burnable?: boolean;
        snapshots?: boolean;
        pausable?: boolean;
        premint?: string;
        mintable?: boolean;
        permit?: boolean;
        votes?: boolean;
        flashmint?: boolean;
    };
    ERC721Data?: {
        accessControl: ACCESSCONTROL;
        upgradeability: Upgradeability;
        Info: Info;
        name: string;
        symbol: string;
        baseUri?: string;
        enumerable?: boolean;
        uriStorage?: boolean;
        burnable?: boolean;
        pausable?: boolean;
        mintable?: boolean;
        incremental?: boolean;
        votes?: boolean;
    };
    ERC1155Data?: {
        accessControl: ACCESSCONTROL;
        upgradeability: Upgradeability;
        Info: Info;
        name: string;
        uri: string;
        burnable?: boolean;
        pausable?: boolean;
        mintable?: boolean;
        supply?: boolean;
    };
    GovernorData?: {
        upgradeability: Upgradeability;
        Info: Info
        name: string;
        delay: string;
        period: string;
        blockTime?: number;
        proposalThreshold?: string;
        decimals?: number;
        quorumMode: 'percent' | 'absolute';
        quorumPercent?: number;
        quorumAbsolute?: string;
        votes: VotesOptions;
        timelock: TimelockOptions;
        bravo?: boolean;
        settings?: boolean;
    }
    status: boolean;
    generated: boolean;
}

const contractSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    ERC20: {
        type: Boolean, required: true
    },
    ERC721: {
        type: Boolean, required: true
    },
    ERC1155: {
        type: Boolean, required: true
    },
    Governor: {
        type: Boolean, required: true
    },
    ERC20Data: {
        type: Object,
        required: false,
        default: false
    },
    ERC721Data: {
        type: Object,
        required: false,
        default: false
    },
    ERC1155Data: {
        type: Object,
        required: false,
        default: false
    },
    GovernorData: {
        type: Object,
        required: false,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    generated: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

contractSchema.statics.build = (attrs: ContractAttrs) => {
    return new Contract(attrs);
};


let contractDb = mongoose.connection.useDb('contracts-db');	
const Contract = contractDb.model<ContractDoc, ContractModel>('Contract', contractSchema);

export { Contract };