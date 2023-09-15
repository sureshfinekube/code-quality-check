import getContractFeature from "../../helpers/contract-feature/get-contract-features";

const GetContractFeatureController = (req, res) => {
    getContractFeature()
        .then((response: any) => {

            return res.status(200).json({
                status: true,
                data: response?.data,
                message: response.message
            });

        }).catch((err) => {
            res.status(500).json({ status: false, message: err?.message });
        })
};

export default GetContractFeatureController;