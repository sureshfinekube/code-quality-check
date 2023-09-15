// import { BadRequestError, validateRequest, Bcrypt, JWT } from '@finekube/nft-client-common';
// import express, { NextFunction, Request, Response } from 'express';
// import { Client } from '../models/client';

// import { SignupBodyValidator } from '../middlewares/signup-middleware';

// const router = express.Router();

// router.post(
//     '/register',
//     SignupBodyValidator,
//     validateRequest,
//     async (req: Request, res: Response, next: NextFunction) => {

//         let {
//             email,
//             password,
//             name,
//             username,
//             phone_number,
//             phone_code,
//             nationality,
//         } = req.body;

//         // Find The Clients if there is someone with same credentials
//         const existingClient = await Client.findOne(
//             {
//                 $or: [
//                     { email },
//                     { username },
//                     { phone_number, nationality }
//                 ]
//             }
//         );


//         // Throwing corresponding errors
//         if (existingClient) {
//             if (existingClient.email === email) throw new BadRequestError('Already registered a account with this email');
//             if (existingClient.username === username) throw new BadRequestError('Already regisetered a account with this username');
//             if (
//                 existingClient.phone_number === phone_number
//                 &&
//                 existingClient.phone_code === phone_code
//             ) throw new BadRequestError('Already registered a account with this phone number')
//         }


//         // Hashing the Password
//         password = await Bcrypt.toHash(password);

//         const client = Client.build({
//             name,
//             username,
//             email,
//             password,
//             phone_number,
//             phone_code,
//             nationality,
//             createdAt: new Date(),
//             updatedAt: new Date()
//         });

//         //Saving to db
//         await client.save();

//         // Generate JWT
//         const clientJwt = new JWT().generateToken(
//             {
//                 id: client.id,
//                 email: client.email
//             }
//         );

//         // Store it on session Object
//         req.session = {
//             jwt: clientJwt
//         };

//         res.status(201).send(client);

//     }
// )

// //Exporting the signup router
// export { router as SignupRouter }