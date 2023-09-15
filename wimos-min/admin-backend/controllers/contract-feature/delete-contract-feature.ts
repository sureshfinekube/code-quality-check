import deleteContractFeature from "../../helpers/contract-feature/delete-contract-feature";

const DeleteContractFeatureController = (req, res) => {
    
    deleteContractFeature(req.params.id)
        .then((response: any) => {

            return res.status(200).json({
                status: true,
                data: response?.data,
                message: response?.message
            });

        })
        .catch((err) => {

            res.status(500).json({ status: false, message: err.message });

        })
};

export default DeleteContractFeatureController;