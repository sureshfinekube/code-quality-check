import axios from 'axios';
import { Request, Response } from 'express';

export const getClientsController = async (req: Request, res: Response) => {

    try {
        let response = await axios.get('http://lb.wimos.io/api/c2b-b2c/get-clients');
        res.status(200).json(response.data);
    }
    catch (err) {
        res.status(400).json({ status: false, message: "Something went wrong" });
    }

}