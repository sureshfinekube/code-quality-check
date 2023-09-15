import getDomain from "../../helpers/client/get-domain";

const getDomainController = async (req, res) => {

    let { domain } = await getDomain();
    // Base domain data
    return res.status(200).json({ data: domain })
};

export default getDomainController;