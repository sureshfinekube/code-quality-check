const RegisterMiddleware = (req, res, next) => {
    let { username, password } = req.body;
    if (typeof (username) === "string" && typeof (password) === "string") {
        if (username.length > 3 && password.length > 3) {
            next();
        }else {
            return res.status(401).json({ status: false, auth: false, message: "Validation Error" });
        }
       
    } else {
        return res.status(401).json({ status: false, auth: false, message: "Only string allowed" });
    }

};

export default RegisterMiddleware;