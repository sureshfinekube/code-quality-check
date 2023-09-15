import { BadRequestError, Bcrypt, validateRequest } from '@finekube/nft-client-common';
import express, { Response, Request } from 'express';
import { forgotPasswordMiddleware } from '../middlewares/forgot-password-middleware';
import { Client } from '../models/client';
import { OtpVerification } from '../models/otp-verification';
import { SendEmailOtp } from '../services/send-email-otp';

const router = express.Router();

const EXPIRATION_WINDOW_SECOND = 3 * 60;

router.post('/',
    forgotPasswordMiddleware, validateRequest,
    async (req: Request, res: Response) => {

        let { email } = req.body;
        // Finding the Client with the email
        let findClient = await Client.findOne({ email });
        // If client not found
        if (!findClient) throw new BadRequestError('Client not found');

        // Sending the email with the otp to reset the password
        let { status, otp } = await SendEmailOtp.sendMessage(email);

        // Has the Otp
        otp = await Bcrypt.toHash(otp);

        if (!status) throw new Error();

        // Calculate an expiration date for this otp verification
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND);

        // Adding the otp to the client
        let buildOtp = OtpVerification.build({
            clientId: findClient.id,
            otp: otp,
            status: 'pending',
            verified: false,
            expiresAt: expiration
        });

        await buildOtp.save();

        res.status(200).json({
            data: buildOtp,
            status: true,
            message: "OTP sent to your email"
        });

    }
);


export { router as forgotPasswordRouter };