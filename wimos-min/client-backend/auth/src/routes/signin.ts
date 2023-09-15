import {
  BadRequestError,
  validateRequest,
  JWT,
  Bcrypt,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { SigninBodyValidator } from "../middlewares/signin-middleware";
import { Client } from "../models/client";
import { Store } from "../models/store";

const router = express.Router();

router.post(
  "/",
  SigninBodyValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find a client with the email or username
    const existingClient = await Client.findOne({
      $or: [{ email: email }, { username: email }],
    }).lean();

    if (!existingClient) throw new BadRequestError("Invalid Credentials");

    console.log('EXISTING--CLIENT',existingClient)

    //Comparing the provided password and stored password
    await Bcrypt.compare(password, existingClient.password)

      .then(async () => {
        // If Password matched

        // Generate JWT
        const clientJwt = new JWT().generateToken({
          id: existingClient._id,
          email: existingClient.email,
        });

        // Store it on session Object
        // req.session = {
        //     jwt: clientJwt
        // };

        existingClient.loginSuccess = true;

        existingClient.token = clientJwt;

        if (existingClient.currentStep !== 15) {
          let storeDetails = await Store.findOne({
            clientId: existingClient._id,
          });

          existingClient.createContractPayload =
            storeDetails?.createContractPayload;
        }

        res.status(200).send(existingClient);
      })
      .catch((err) => {
        console.log('SIGNIN--CATCH==>',err)
        // If Password not matched
        throw new BadRequestError("Invalid Credentials");
      });
  }
);

// Exporting the signup router
export { router as signinRouter };
