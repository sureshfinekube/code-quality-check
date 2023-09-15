import express, { Request, Response } from "express";
import { getHomepageData } from "../../utils/axios";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

  try {
    const domain: string = req.store?.domain as string;

    let {data} = await getHomepageData(domain);
  
    res.json({ status: true, data: data?.data });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error+''
    })
  }
  
});

export { router as getHomePageData };
