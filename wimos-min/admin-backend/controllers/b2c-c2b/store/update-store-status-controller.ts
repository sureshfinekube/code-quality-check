import axios from "axios";
import { Request, Response } from 'express';

export const updateStoreStatusController = async (req: Request, res: Response) => {
    let { id, status } = req.body;

    try {
        let response = await axios.put('http://lb.wimos.io/api/c2b-b2c/store/update-status',
            { store_id: id, status }
        );

        if (response.data.status) {
            res.status(200).json({ status: true, message: "Store status updated successfully" });
        } else {
            res.status(400).json({ status: false, message: "Something went wrong" });
        }

    }
    catch (err) {
        res.status(400).json(err.response.data)
    }

};