import getBasicFee from "../../helpers/basic-fee/get-basic-fee";

const GetBasicContractController = (req, res) => {
  getBasicFee()
    .then((payload) => res.status(200).json(payload))
    .catch((err) => res.status(200).json(err));
};

export default GetBasicContractController;
