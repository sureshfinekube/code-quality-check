import getStatistics from "../../helpers/admin/admin-dashboard";

const DashboardController = (req, res) => {

   
    getStatistics()
        .then((payload) => {
           // console.log(payload);
            
            return res.status(200).json({ status: true, response: payload });
        })
        .catch((err) => res.status(200).json({ status: false, message: err.message }));

};

export default DashboardController;