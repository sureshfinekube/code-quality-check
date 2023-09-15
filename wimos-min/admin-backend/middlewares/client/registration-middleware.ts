import { ClientData } from "../../../helpers/client/client-registration";

const ClientRegistrationMiddleware = (req, res, next) => {

    try {
        let { name, username, email, nationality, phone_number, password, store_name, domain_name, network, wallet_id }: ClientData = req.body;

        if (
            typeof (name) === "string" &&
            typeof (username) === "string" &&
            typeof (password) === "string" &&
            typeof (email) === "string" &&
            typeof (phone_number) === "string" &&
            typeof (nationality) === "string" &&
            typeof (store_name) === "string" &&
            typeof (domain_name) === "string" &&
            typeof (network) === "string" &&
            typeof (wallet_id) === "string" &&
            name.length > 3 &&
            username.length > 3 &&
            password.length > 3 &&
            email.length > 3 &&
            phone_number.length > 7 &&
            nationality.length > 2 &&
            store_name.length > 2 &&
            domain_name.length > 3 &&
            network.length > 2 &&
            wallet_id.length > 5
        ) {
            next();
        }
        else {
            return res.status(400).json({ status: false, message: "payload type error" });
        }

    }
    catch (err) {
        return res.status(400).json({ status: false, message: "payload type error" });
    }

};

export default ClientRegistrationMiddleware;