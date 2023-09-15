const LogoutController = (req, res) => {
    try {
        let token = req?.cookies?.jwttoken;

        if (!token) return res.status(200).json(
            { status: false, logoutStat: true, msg: "There is not token" }
        );
        else {
            res.cookie('jwttoken', '', { httpOnly: false, sameSite: 'none', secure: true, expires: new Date(Date.now()) });
            let response = {
                status: true,
                logoutStat: true
            };
            res.status(200).json(response);
        }

    } catch (err) {
        let response = {
            status: false,
            logout: false
        };
        res.status(400).json(response);
    }
};

export default LogoutController;