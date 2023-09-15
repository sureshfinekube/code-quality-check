import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res) => {

    let token = req?.cookies?.jwttoken;

    if (!token) return res.status(200).json({ status: false, msg: "No token. Authorization denied" })
    else {
        token = token.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.json({ status: false, message: "Token is Expired!" });
                }
                else {
                    req.user = user;
                    let userData = user.userData;
                    return res.status(200).json({ auth: true, status: true, user: userData, message: "Token Validated" })
                }
            })
        }
        catch (err) {
            return res.status(400).json({ msg: "Token is Invalid", status: false });
        }
    }
};

export default verifyAdmin;