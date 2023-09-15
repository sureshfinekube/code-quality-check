import { Request, Response } from "express";
import getPackages from "../../../helpers/packages/get-packages";

export const getPackagesController =

    async (req: Request, res: Response) => {
        getPackages()
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(400).json({ status: false, message: "Something went wrong" });
            });

    };
