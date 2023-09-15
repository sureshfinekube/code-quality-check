import { E2C } from "./Instances/e2cInstance";
import { E2B } from "./Instances/e2bInstance";

// Get Store
export const getStoreWithDomain = async (domain: string, requestUrl: any) => {
    return await E2C.get(`/c2e-e2c/get-store-with-domain?domain=${domain}&url=${requestUrl}`)
};

// Get Client Data
export const getClientData = async (clientId: string) => {
    return await E2C.get(`/c2e-e2c/get-client/${clientId}`);
};

// Get PackageData
export const getPackageData = async (packageId: string) => {
    return await E2B.get(`/b2c-c2b/api/package/${packageId}`)
}

// Get Contract by domain
export const getContractByDomain = async (domain: string) => {
    return await E2C.get(`/c2e-e2c/get-contract-with-domain?domain=${domain}`)
}

// Get Homepage data
export const getHomepageData = async (domain: string) => {
    return await E2C.get(`/c2e-e2c/home-page?domain=${domain}`)
}

// Update listing fee for client's store
export const updateListingFee = async (body: any) => {
    return new Promise ((resolve, reject) => {
        E2C.put(`/store/listing-fee`, {
            storeId: body?.storeId,
            listingFee: body?.listingFee,
            metamaskId: body?.metamaskId
        }).then((resp) => {
            console.log('after update from client',resp)
            resolve(resp)
        }).catch((error) => {
            console.log('after error in update from client',error)

            reject(error)
        })
    }) 
}

// Get listing fee data
export const getListingFee = async (body: any) => {
    return new Promise((resolve, reject) => {
        E2C.get(`/c2e-e2c/store/listing-fee?storeId=${body?.storeId}&metamaskId=${body?.metamaskId}`,{
            headers: {
                'Authorization': `${body?.userToken}`
            }
        }).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error?.response?.data?.errors)
        })
    }) 
}

// Get blogs
export const getBlogsData = async (id: any, category: any) => {
    return new Promise((resolve, reject) => {
        E2C.get(`/c2e-e2c/blogs?id=${id}&category=${category}`).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error?.response?.data?.errors)
        })
    }) 
}

// Get pages
export const getPagesData = async (id: any) => {
    return new Promise((resolve, reject) => {
        E2C.get(`/c2e-e2c/pages/${id}`).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error?.response?.data?.errors)
        })
    }) 
}

// Get social media
export const getSocialMediaData = async (id: any) => {
    return new Promise((resolve, reject) => {
        E2C.get(`/c2e-e2c/social-media/${id}`).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error?.response?.data?.errors)
        })
    }) 
}

// Get blog categories
export const getBlogCategoriesData = async (id: any) => {
    return new Promise((resolve, reject) => {
        E2C.get(`/c2e-e2c/blog-categories/${id}`).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error?.response?.data?.errors)
        })
    }) 
}

// Add listing fee recipient
export const addListingFeeRecipient = async (data: any) => {
    return new Promise ((resolve, reject) => {
        E2C.post(`/store/listing-fee-recipient`, {
            storeId: data?.storeId,
            metamaskId: data?.metamaskId,
            percentage: data?.percentage
        },{
            headers: {
                'Authorization': `${data?.userToken}`
            }
        }).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error)
        })
    }) 
}

// Update listing fee recipients
export const updateListingFeeRecipient = async (data: any) => {
    return new Promise ((resolve, reject) => {
        E2C.put(`/store/listing-fee-recipient`, {
            storeId: data?.storeId,
            id: data?.id,
            metamaskId: data?.metamaskId,
            percentage: data?.percentage
        },{
            headers: {
                'Authorization': `${data?.userToken}`
            }
        }).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error)
        })
    }) 
}

// Delete listing fee recipients
export const deleteListingFeeRecipient = async (data: any) => {
    return new Promise ((resolve, reject) => {
        E2C.delete(`/store/listing-fee-recipient?storeId=${data?.storeId}&id=${data?.id}`,{
            headers: {
                'Authorization': `${data?.userToken}`
            }
        }).then((resp) => {
            resolve(resp)
        }).catch((error) => {
            reject(error)
        })
    }) 
}