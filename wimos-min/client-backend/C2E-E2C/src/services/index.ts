import { C2B } from "./axios-instance"

// Get PackageData
export const getPackageData = async (packageId: string) => {
    return await C2B.get(`/b2c-c2b/api/package/${packageId}`)
}