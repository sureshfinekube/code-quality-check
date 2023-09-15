import express, { Request, Response } from "express";
import { getPagesData } from "../../utils/axios";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

  try {

    let {data}: any = await getPagesData(req.store?.storeId);

    if (data?.status) {
        res.status(200).json({ status: true, data: {
            pages: data?.data?.pages
        }});
    } else {
        res.status(400).json({ 
            status: false, 
            message: 'Error while fetching blogs'
        });
    }
  
} catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong'
    })
}
  
});

export { router as getPages };
