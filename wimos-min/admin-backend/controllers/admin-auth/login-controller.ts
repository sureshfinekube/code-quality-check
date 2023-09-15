import adminLogin from "../../helpers/admin-auth/admin-login";
import jwtSign, { JwtSignResponse } from "../../helpers/jwt/jwt-sign";

const LoginController = (req, res) => {

    let { username, password } = req.body;

    adminLogin(username, password)
        .then(({ userId }) => {

            jwtSign({ userId, username, password }).then((payload: JwtSignResponse) => {


                res.cookie('jwttoken', payload.token, { httpOnly: false, sameSite: 'none', secure: true, expires: new Date(Date.now() + 36000000) });

                return res.status(200).json({ status: true, auth: true, message: "Login Successfull" });

            })

                .catch((err) => {

                    res.status(400).json({ status: false, auth: false, message: err.message });
                })
        })
        .catch((err) => {

            res.status(400).json({ status: false, auth: false, message: err.message });

        })
};

export default LoginController;