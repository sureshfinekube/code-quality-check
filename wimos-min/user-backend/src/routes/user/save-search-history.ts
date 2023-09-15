// // _SEARCH HISTORY (if user logged in)
// console.log("jocker", req.currentUser?.id);
// if (req.currentUser?.id) {
//   let latestSearchHistories = await SearchHistory.find({
//     userId: req.currentUser?.id,
//     storeId: req.store?.storeId,
//   })
//     .sort({ _id: -1 })
//     .lean();

//   // Check whether search history exceeds 5

//   // Checking whether this keyword already searched, if yes 'delete it'
//   let isSameSearch = latestSearchHistories.find(
//     (e: any) => e.keyword === keyword
//   );
//   await SearchHistory.deleteOne({ _id: isSameSearch?._id });

//   // saving new keyword
//   let searchhistoryBuild = new SearchHistory({
//     userId: req.currentUser?.id,
//     storeId: req.store?.storeId,
//     keyword: keyword,
//   });

//   await searchhistoryBuild.save();

import express, { Request, Response } from "express";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { User } from "../../models/users";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { SearchHistory } from "../../models/search-history";

const router = express.Router();

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
  if (!req.store?.storeId) throw new BadRequestError("Store not found");

  // Check userid
  let isValidUserId = await User.findOne({_id: req.currentUser?.id})
  if (!isValidUserId) throw new BadRequestError("Invalid user")

  // Validate keyword
  let { keyword, nftId } = req.body;

  if (!keyword || !nftId) throw new BadRequestError("Required params missing");

  try {
      let latestSearchHistories = await SearchHistory.find({
        userId: req.currentUser?.id,
        storeId: req.store?.storeId,
      })
        .sort({ _id: -1 })
        .lean();

      // Check whether search history exceeds 5

      // Checking whether this keyword already searched, if yes 'delete it'
      let isSameSearch = latestSearchHistories.find(
        (e: any) => e.nftId === nftId
      );
      await SearchHistory.deleteOne({ _id: isSameSearch?._id });

      // saving new keyword
      let searchhistoryBuild = new SearchHistory({
        userId: req.currentUser?.id,
        storeId: req.store?.storeId,
        nftId: nftId,
        keyword: keyword,
      });

       await searchhistoryBuild.save()

      res.status(200).json({ status: true, data: 'History updated successfully' });

  } catch (error) {
    throw new Error();
  }
});

export { router as saveSearchHistory };
