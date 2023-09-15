import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";

import macaddress from "macaddress";

const DeviceDetector = require("node-device-detector");

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  let macAdd: any = ''
  await macaddress.one().then(function (mac) {
    console.log("Mac address for this host: %s", mac);
    macAdd = mac;
  });

  const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });

  //   const userAgent =
  //     "Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36";

  console.log('user-ggggent',req.get("User-Agent"))
  const userAgent = req.get("User-Agent");

  const result = detector.detect(userAgent);
  console.log("result parse", result);

  if (macAdd && result) {
    res.status(200).json({
        device: result,
        mac: macAdd
    })
  }
});

export { router as macDeviceTest };
