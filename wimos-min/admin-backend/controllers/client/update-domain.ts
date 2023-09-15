import addDomain from "../../helpers/client/add-domain";
import updateDomain from "../../helpers/client/update-domain";

export const updateDomainController = (req, res) => {
    let { id, domain } = req.body;
    updateDomain({id, domain})
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}