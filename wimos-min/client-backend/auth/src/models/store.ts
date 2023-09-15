import mongoose from "mongoose";

interface StoreAttrs {
  clientId: string;
  store_name: string;
  store_domain: string;
  network: string;
  categories: Array<categories>;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface categories {
  name: string;
  status: boolean;
}

interface StoreModel extends mongoose.Model<any> {
  build(attrs: StoreAttrs): StoreDoc;
}

interface StoreDoc extends mongoose.Document {
  clientId: string;
  store_name: string;
  store_domain: string;
  network: string;
  categories: Array<categories>;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

const storeSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    store_name: {
      type: String,
      required: true,
    },
    store_domain: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
      default: "etherium",
    },
    store_logo: {
      type: String,
      default: false,
    },
    store_content: {
      type: String,
      required: false,
      default: "",
    },
    bannerHeading: {
      type: String,
      required: false,
    },
    footerContent: {
      type: String,
      required: false,
    },
    favIcon: {
      type: String,
      default: false,
    },
    banner_image: {
      type: String,
      default: false,
    },
    categories: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    activeStatus: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    first_time_payment_status: {
      type: Boolean,
      default: false,
    },
    first_time_payment_id: {
      type: String,
    },
    first_time_payment_order_id: {
      type: String,
    },
    seo: {
      meta_title: {
        type: String,
      },
      meta_description: {
        type: String,
      },
      meta_tag: {
        type: Array,
      },
      previewImage: {
        type: String,
      },
      robotsText: {
        type: String,
      },
    },
    contractFeatures: {
      mintable: {
        type: Boolean,
      },
      burnable: {
        type: Boolean,
      },
      uriStorage: {
        type: Boolean,
      },
      pausable: {
        type: Boolean,
      },
      votes: {
        type: Boolean,
      },
      enumerable: {
        type: Boolean,
      },
      supply: {
        type: Boolean,
      },
    },
    user_profile_picture: {
      type: String,
    },
    user_cover_picture: {
      type: String,
    },
    type: {
      type: String,
      enum: ["marketplace", "single_store"],
    },
    contractStandard: {
      type: String,
      enum: ["erc721", "erc1155", "combinedContract"],
    },
    metamaskId: {
      type: String,
    },
    listingFee: {
      type: Number,
    },
    createContractPayload: {
      type: Object,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
    isLazyMintingContract: {
      type: Boolean,
    },
    gaTrackingId: {
      type: String,
    },
    contactDetails: {
      nationality: {
        type: String,
      },
      email: {
        type: String,
      },
      countryCode: {
        type: String,
      },
      phone: {
        type: Number,
      },
      address: {
        type: String,
      },
    },
    marketplaceTemplate: {
      type: String,
      enum: [
        "simpleERC721", // simple erc721
        "simpleERC1155", // simple erc1155
        "nonSimpleERC721", // with auction erc721
        "nonSimpleERC1155", // with auction erc1155

        "simpleERC721LazyMint", // simple erc721
        "simpleERC1155LazyMint", // simple erc1155
        "nonSimpleERC721LazyMint", // with auction erc721
      ],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.status;
        delete ret.__v;
      },
    },
  }
);

storeSchema.statics.build = (attrs: StoreAttrs) => {
  return new Store(attrs);
};

const storeDb = mongoose.connection.useDb("store-db");
const Store = storeDb.model<StoreDoc, StoreModel>("Store", storeSchema);

export { Store };
