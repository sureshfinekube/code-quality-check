
import axios from 'axios';

const getStatistics = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // let allClientsCount = await clientModel.countDocuments();
            // let allActiveClientsCount = await clientModel.where({ 'status': 'true' }).countDocuments();

            // var start = new Date();
            // start.setHours(0, 0, 0, 0);

            // var end = new Date();
            // end.setHours(23, 59, 59, 999);

            // var todayClientCount = await clientModel.countDocuments({ "joined_at": { "$gte": start, "$lt": end } });

            let clientAnalytics = await (await axios.get('http://lb.wimos.io/api/c2b-b2c/get-analytics')).data;

            console.log('client==analytics',clientAnalytics)

            // Static Data's Need to be fetched from Client server - Update in the future
            var totalStores = clientAnalytics?.totalStores;
            var totalSubscriptions = clientAnalytics?.totalSubscriptions;
            var totalActiveClients = clientAnalytics?.totalActiveClients;
            var totalClients = clientAnalytics?.totalClients;
            var totalRevenue = clientAnalytics?.totalRevenue;

            resolve({
                totalStores,
                totalSubscriptions,
                totalActiveClients,
                totalClients,
                totalRevenue
            });

        }
        catch (err) {
            console.log('analytics-dashboard-err==>',err);
            reject({ status: false, client: [], message: "something went wrong" });
        }
    })
};

export default getStatistics;