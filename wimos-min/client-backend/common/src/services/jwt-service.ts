import jwt from 'jsonwebtoken';

abstract class JWTServices {
    abstract generateToken(clientData: ClientData): string;
};

export interface ClientData {
    id: string;
    email: string;
}

export class JWT extends JWTServices {
    constructor() {
        super()
    };
    generateToken(clientData: ClientData) {
        const token = jwt.sign({
            id: clientData.id,
            email: clientData.email
        },
            process.env.JWT_KEY!,
        {
            expiresIn: '1d'
        }
        );

        return token;
    };

}