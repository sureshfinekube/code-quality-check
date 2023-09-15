import axios from 'axios';

export class FreePackage {
    static fetch() {
        return new Promise<freePackageResponse>(async function (resolve, reject) {

            try {

                let { data } = await axios.get('https://spapi.wimos.io/b2c-c2b/api/free-package')

                resolve({ status: data.status , freePackageData: data.free_package })

            } catch (error) {
                reject({ status: false, message: 'Something went wrong' })
            }

        })
    }
}

// Otp interface
interface freePackageResponse {
    status: boolean;
    freePackageData: any;
}