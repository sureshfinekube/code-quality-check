import { BadRequestError, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { OtpVerifyCreatedPublisher } from '../events/publishers/otp-verify-publisher';
import { emailVerificationMiddleware } from '../middlewares/email-verification-middleware';
import { Client } from '../models/client';
import { VerificationClient } from '../models/verification-client';
import { natsWrapper } from '../nats-wrapper';
import { Bcrypt } from '@finekube/nft-client-common';
import { MailGun } from '../services/mailgun';
import { createTrue } from 'typescript';

const router = express.Router();

const EXPIRATION_WINDOW_SECOND = 3 * 60;

router.post('/',

    emailVerificationMiddleware,
    validateRequest,
    async (req: Request, res: Response) => {

        let { name, email, username, password, phone_number, phone_code, nationality, address } = req.body;

        let clientAlreadyFound = await Client.findOne({
            $or: [
                { username: username },
                { email: email },
                // { phone_number: phone_number }
            ]
        });

        if (clientAlreadyFound) throw new BadRequestError("Email already exists");

        // let clientAlreadyOtpRequestFound = await VerificationClient.findOne({
        //     $or: [
        //         { "client_data.username": username },
        //         { "client_data.email": email },
        //         { "client_data.phone_number": phone_number }
        //     ]
        // });

        // if (clientAlreadyOtpRequestFound) throw new BadRequestError('Already user requested for otp');


        await MailGun.sendMessage(email)
            .then(async (payload) => {

                // Hashing the Password
                password = await Bcrypt.toHash(password);

                // Hashing the otp
                payload.otp = await Bcrypt.toHash(payload.otp);

                // Calculate an expiration date for this otp verification
                const expiration = new Date();
                expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND);

                // Build the Validation Client
                const verificationClient = VerificationClient.build({
                    status: "pending",
                    verified: false,
                    otp: payload.otp,
                    client_data: {
                        name,
                        email,
                        username,
                        password,
                        phone_number,
                        phone_code,
                        nationality,
                        address,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    expiresAt: expiration
                });

                // Save to Db
                await verificationClient.save();

                // Publish an event saying that an OTP Verification has created
                new OtpVerifyCreatedPublisher(natsWrapper.client).publish({
                    id: verificationClient.id,
                    expiresAt: verificationClient.expiresAt.toISOString()
                });

                res.status(200).json({ message: "Otp have sent successfully", data: verificationClient })
            })
            .catch((err) => {
                throw new Error('Something went wrong')
            });

    });


// Export the EmailOtpRouter
export { router as createEmailOtpRouter };