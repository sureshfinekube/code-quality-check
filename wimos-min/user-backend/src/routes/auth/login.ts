import express, { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { loginRouteValidation } from '../../middlewares/controller-middlewares/login-middleware';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';

import { User } from '../../models/users';
import { JWT } from '../../services/jwt';

import { bufferToHex, toBuffer, hashPersonalMessage, fromRpcSig, ecrecover, publicToAddress } from 'ethereumjs-util'

const router = express.Router();

router.post('/',
    loginRouteValidation, validateRequest,
    async (req: Request, res: Response) => {

        if (!req?.store?.storeId) throw new BadRequestError('Store not found');

        let { metamaskId, msg, signature } = req.body;

        // If metamskId is not provided
        if (!metamaskId) throw new BadRequestError('Metamask ID is required');

        // Check if user exists
        let user = await User.findOne({ metamaskId, storeId: req.store?.storeId });


        // METAMASK SIGNATURE VERIFICATION
        let address = ''
        try {
            // Convert msg to hex string
            const msgHex = bufferToHex(Buffer.from(msg));

            // Check if signature is valid
            const msgBuffer = toBuffer(msgHex);
            const msgHash = hashPersonalMessage(msgBuffer);
            const signatureBuffer: any = toBuffer(signature);
            const signatureParams = fromRpcSig(signatureBuffer);
            const publicKey = ecrecover(
                msgHash,
                signatureParams.v,
                signatureParams.r,
                signatureParams.s
            );
            const addresBuffer = publicToAddress(publicKey);
            address = bufferToHex(addresBuffer);    
        } catch (error) {
            // throw new Error('Signature Error!');
            return res.status(400).json([{
                 message: 'Signature Error!', field: 'Signature' 
            }]);
        }

    
        // Check if address matches
        // console.log('decoded-address: ',address.toLowerCase())
        // console.log('body-address: ',metamaskId.toLowerCase())
        if (address.toLowerCase() !== metamaskId.toLowerCase()) {
            throw new BadRequestError('Invalid credentials');
        }

        // If no user create user account with metamask
        if (!user) {

            try {

                // const buildUser = User.build({
                //     metamaskId: metamaskId,
                //     storeId: req.store?.storeId,
                // });

                // await buildUser.save();

                await User.updateOne({
                    metamaskId: metamaskId,
                    storeId: req.store?.storeId
                  },
                  {
                    $set: {
                        metamaskId: metamaskId,
                        storeId: req.store?.storeId
                    }
                  },
                  {
                    upsert: true
                })

                let buildUser: any = await User.findOne({
                    metamaskId: metamaskId,
                    storeId: req.store?.storeId
                })

                console.log('@@new user created',buildUser)

                let userJwt = new JWT().generateToken(
                    {
                        id: buildUser?.id,
                        metamaskId: buildUser?.metamaskId,
                        email: buildUser?.email,
                        storeId: buildUser?.storeId,
                    }
                );

                // req.session = {
                //     jwt: userJwt
                // };

                // res.cookie('session',userJwt,{
                //     httpOnly: true,
                //     signed: false,
                //     secure: true,
                //     sameSite: 'none',
                //     maxAge: 90000 
                // })

                return res.json({
                    status: true,
                    data: buildUser,
                    message: "Created user account and login success",
                    token: userJwt
                });

            }
            catch (err) {
                console.log(err);
                throw new Error();
            }

        };

        let userJwt = new JWT().generateToken(
            {
                id: user.id,
                metamaskId: user.metamaskId,
                email: user.email,
                storeId: user.storeId,
            }
        );

        // req.session = {
        //     jwt: userJwt
        // };

        // res.cookie('session',userJwt,{
        //     httpOnly: true,
        //     signed: false,
        //     secure: true,
        //     sameSite: 'none',
        //     maxAge: 90000 
        // })

        // console.log('jwt created and assigned to session')


        // Send response
        return res.json({
            status: true,
            data: user,
            message: 'Login Successful',
            token: userJwt
        });



        // if (user) {
        //     let nonce = 726924
        //     console.log('nonce',nonce)
            
        //     const msg = "Nonce: 72692\n\nId: cUj94abZIFcKzCUQTDlmIyy0J29he658C8YCiTXc:1669121471980";
        //         // Convert msg to hex string

        //         const msgHex = bufferToHex(Buffer.from(msg));

    
        //         // Check if signature is valid
        //         const msgBuffer = toBuffer(msgHex);
        //         const msgHash = hashPersonalMessage(msgBuffer);
        //         const signatureBuffer: any = toBuffer(req.body?.signature);
        //         const signatureParams = fromRpcSig(signatureBuffer);
        //         const publicKey = ecrecover(
        //             msgHash,
        //             signatureParams.v,
        //             signatureParams.r,
        //             signatureParams.s
        //         );
        //         const addresBuffer = publicToAddress(publicKey);
        //         const address = bufferToHex(addresBuffer);
    
        //         // Check if address matches
        //         console.log('decoded-address: ',address.toLowerCase())
        //         console.log('body-address: ',metamaskId.toLowerCase())


        //         if (address.toLowerCase() === metamaskId.toLowerCase()) {
        //             res.send('correct daa')

        //             // Change user nonce
        //             // user.nonce = Math.floor(Math.random() * 1000000);
        //             // user.save((err) => {
        //             //     if (err) {
        //             //         res.send(err);
        //             //     }
        //             // });
        //             // // Set jwt token
        //             // const token = jwt.sign({
        //             //     _id: user._id,
        //             //     address: user.address
        //             // }, process.env.JWT_SECRET, {expiresIn: '6h'});
        //             // res.status(200).json({
        //             //     success: true,
        //             //     token: `Bearer ${token}`,
        //             //     user: user,
        //             //     msg: "You are now logged in."
        //             // });
        //         } else {
        //             // User is not authenticated
        //             // res.status(401).send('Invalid credentials');
        //             res.send('dei invalid credentials daa.. eppudraa..')
        //         }

        // } else {
        //     res.send('userr not registered')

        // }

    }
);


export { router as loginRouter };