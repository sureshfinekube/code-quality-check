const clientUpdateMiddleware = (req, res, next) => {

    try {


        let { userId } = req.body;
        if (
            typeof (userId) === "string"
        ) {
            if (userId.length === 24) next();
            else res.status(400).json({ status: false, message: "_id is not valid" })
        }
        else {
            res.status(400).json({ status: false, message: "payload type error" });
        }
    }
    catch (err) {
        res.status(400).json({ status: false, message: "Payload type error" });
    }

};

export default clientUpdateMiddleware;