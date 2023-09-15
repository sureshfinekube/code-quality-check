import { BadRequestError } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { Client } from '../models/client';
import { Store } from '../models/store';
import { getPackageData } from '../services';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response) => {
        // Get domain from the query
        let { domain } = req.query;
        let url: string = req.query.url as string

        console.log('origin checking in store middleware new= ',url)

        console.log('this is the domain in query',domain)

        // Finding the store with the domain

        // these are the urls(requests) from portal(client)
        let e2cUrls = ['/v1/e2c-c2e/get-users', '/v1/e2c-c2e/get-user-nfts', '/v1/e2c-c2e/get-user-collections', '/v1/dashboard/get-data', '/v1/e2c-c2e/reports', '/api/blogs/get-blogs']

        let store;

        if (e2cUrls.includes(url)) {
            console.log('in include')
            store = await Store.findOne({ store_domain: domain });
        } else {
            console.log('not include')

            store = await Store.findOne({ store_domain: domain, activeStatus: true });
        }

        console.log('store--found==',store?.name)

        // If store not found
        if (!store) throw new BadRequestError('Store not found');

        // Get client data
        let client = await Client.findById(store.clientId);

        // If client not found
        if (!client) throw new BadRequestError('Client not found');

        try {

            let filteredCategories = store.categories

            filteredCategories = filteredCategories.filter((item: any) => item.status == true)

            store.categories = filteredCategories

            let { data } = await getPackageData(client.packageId)

            //send the response
            res.send({
                status: true,
                data: {
                    store,
                    client,
                    package: data.package
                }
            });
        }
        catch (err) {
            console.log('package-find-error-catch===',err)
            throw new BadRequestError('Package not found');
        };


    }
);

export { router as getStoreWithDomainRouter };