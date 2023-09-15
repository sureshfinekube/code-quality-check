import { BadRequestError, validateRequest, JWT, Bcrypt } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { checkUsernameValidator } from '../middlewares/check-username-middleware';
import { Client } from '../models/client';


const router = express.Router();

router.get(
    '/',
    checkUsernameValidator,
    validateRequest,
    async (req: Request, res: Response) => {

        try {

            let username: any = req.query.username!;

            console.log('what-the-username',username)

            if (username.length < 3) {
                console.log('in regexx')
                return res.status(200).json({
                    status: false, 
                    message: 'Username should be atleast 3 characters'
                }) 
            }

            if (username.length > 20) {
                console.log('in regexx')
                return res.status(200).json({
                    status: false, 
                    message: 'Username should not exceed 20 characters'
                }) 
            }

            // Validate for spaces
            if (/\s/.test(username)) {
                return res.status(200).json({
                    status: false, 
                    message: 'Spaces are not allowed'
                }) 
            }

            // Validate for special characters
            if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(username)) {
                return res.status(200).json({
                    status: false, 
                    message: 'Special characters are not allowed'
                }) 
            }     


            username = username.toLowerCase()
            

            // Check whether username is already taken or not
            const existingClient = await Client.findOne({ username: username });

            if (existingClient) {
                return res.status(200).json({
                    status: false, 
                    message: 'Username already exists'
                })
            }

            // success response
            return res.status(200).json({
                status: true,
                messag: 'Username available'
            })

        } catch (err) {
            console.log('errr',err)
            throw new Error('Something went wrong')
        }

    });


// Exporting the signup router
export { router as checkUsername };