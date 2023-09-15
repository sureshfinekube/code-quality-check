import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    res.status(200).json({
        DATA: "1",
        userId: "1234",
        data: "zxcasd",
    })
})

export { router as testPostForOneClick };
