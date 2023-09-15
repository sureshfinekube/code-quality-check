import jwt from 'jsonwebtoken';

//JWT SIGN
const jwtSign = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            let token = jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 6000000 });
            token = "bearer " + token;
            let response: JwtSignResponse = { status: true, message: "JWT Signed", token };
            resolve(response);
        }
        catch (e) {
            let response = { status: false, message: "JWT Failed" }
            reject(response);
        }
    })
};

export interface JwtSignResponse {
    status: boolean,
    message: string,
    token: string
}

export default jwtSign;
