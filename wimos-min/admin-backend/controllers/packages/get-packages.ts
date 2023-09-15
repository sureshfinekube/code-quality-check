import getPackages from "../../helpers/packages/get-packages";

const GetPackagesController = (req,res) => {

    getPackages()
    .then((payload) => res.status(200).json(payload))
    .catch ((err) => res.status(200).json(err));

};

export default GetPackagesController;
