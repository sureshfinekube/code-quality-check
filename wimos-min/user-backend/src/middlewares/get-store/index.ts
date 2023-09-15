import { Request, Response, NextFunction } from "express";
import {
  getClientData,
  getPackageData,
  getStoreWithDomain,
} from "../../utils/axios";
import { BadRequestError } from "../custom-err/bad-request-error";

interface Package {
  id: string;
  name: string;
  features: object[];
  unlimited_product: boolean;
  unlimited_page: boolean;
  unlimited_store: boolean;
  product_limit: number;
  page_limit: number;
  store_limit: number;
  created_at: string;
  updated_at: string;
  status: boolean;
}

interface StorePayload {
  storeId: string | null;
  name: string | null;
  domain: string;
  clientId: string | null;
  network: string | null;
  storeLogo: string | null;
  storeContent: string | null;
  bannerImage: string | null;
  categories: object[] | null;
  activeStatus: boolean | null;
  package: Package | null;
  status: boolean | null;
  seo: object | null;
  bannerHeading: string | null;
  footerContent: string | null;
  favIcon: string | null;
  contractFeatures: object | null;
  user_profile_picture: string | null;
  user_cover_picture: string | null;
  type: string | null;
  contractStandard: string | null;
  metamaskId: string | null;
  gaTrackingId: string | null;
  contactDetails: string | null;
  marketplaceTemplate: string | null;
  isLazyMintingContract: boolean | null;
}

declare global {
  namespace Express {
    interface Request {
      store?: StorePayload;
    }
  }
}

let store: StorePayload = {
  domain: "",
  storeId: null,
  name: null,
  clientId: null,
  network: null,
  storeLogo: null,
  storeContent: null,
  bannerImage: null,
  categories: null,
  activeStatus: null,
  package: null,
  status: null,
  seo: null,
  bannerHeading: null,
  footerContent: null,
  favIcon: null,
  contractFeatures: null,
  user_profile_picture: null,
  user_cover_picture: null,
  type: null,
  contractStandard: null,
  metamaskId: null,
  gaTrackingId: null,
  contactDetails: null,
  marketplaceTemplate: null,
  isLazyMintingContract: null
};

export async function GetStoreFromHost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const origin: string = req.headers.origin as string;
  let queryOrigin: string = req.query?.domain as string;

  if (!origin && !queryOrigin) throw new BadRequestError("Origin not found");

  if (queryOrigin) {
    store.domain = queryOrigin;
  } else {
    // let storeDomain = origin.split(".")[0];
    let storeDomain = origin;

    if (storeDomain.includes("http://") || storeDomain.includes("https://")) {
      storeDomain = storeDomain.replace(/(^\w+:|^)\/\//, "");
    }

    if (!storeDomain || storeDomain.includes("wimoos"))
      return res
        .status(404)
        .json({ status: false, message: "Invalid Request" });

    store.domain = storeDomain;
  }

  try {
    let requestUrl = req.originalUrl.split("?").shift();
    let { data } = await getStoreWithDomain(store.domain, requestUrl);

    let { client } = data.data;
    let storeData = data.data.store;
    let packageData = data.data.package;

    // if (!storeData.activeStatus) {
    //     throw new BadRequestError('Store not found')
    // }

    store = {
      ...store,
      clientId: storeData.clientId,
      name: storeData.store_name,
      network: storeData.network,
      storeLogo: storeData.store_logo,
      storeContent: storeData.store_content,
      bannerImage: storeData.banner_image,
      categories: storeData.categories,
      activeStatus: storeData.activeStatus,
      package: {
        id: packageData?._id,
        name: packageData?.name,
        features: packageData?.features,
        unlimited_product: packageData?.unlimited_product,
        unlimited_page: packageData?.unlimited_page,
        unlimited_store: packageData?.unlimited_store,
        product_limit: packageData?.product_limit,
        page_limit: packageData?.page_limit,
        store_limit: packageData?.store_limit,
        created_at: packageData?.created_at,
        updated_at: packageData?.updated_at,
        status: packageData?.status,
      },
      storeId: storeData.id,
      seo: storeData?.seo,
      bannerHeading: storeData?.bannerHeading ? storeData?.bannerHeading : '',
      footerContent: storeData?.footerContent,
      favIcon: storeData?.favIcon,
      contractFeatures: storeData?.contractFeatures,
      user_profile_picture: storeData?.user_profile_picture,
      user_cover_picture: storeData?.user_cover_picture,
      type: storeData?.type,
      contractStandard: storeData?.contractStandard,
      metamaskId: storeData?.metamaskId,
      gaTrackingId: storeData?.gaTrackingId,
      contactDetails: storeData?.contactDetails,
      marketplaceTemplate: storeData?.marketplaceTemplate,
      isLazyMintingContract: storeData?.isLazyMintingContract
    };
  } catch (err: any) {
    console.log("catch store found error ",err);
    throw new BadRequestError("Store not found");
    // res.status(200).json({
    //   errors: [
    //     {
    //       message: 'Store nott found'
    //     }
    //   ]
    // })
  }

  req.store = store;
  next();
}
