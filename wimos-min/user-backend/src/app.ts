import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { GetStoreFromHost } from './middlewares/get-store';
import { errorHandler } from './middlewares/custom-err/error-handler';
import cookieParser from 'cookie-parser';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
// import hpp from 'hpp';
// import {xss} from 'xss-clean'

dotenv.config();

// Import the routers
import { loginRouter } from './routes/auth/login';
import { logoutRouter } from './routes/auth/logout';
import { updateProfileRouter } from './routes/auth/update-profile';
import { createCollectionRouter } from './routes/collection/create';
import { getContractDataRouter } from './routes/contract/get-contract';
import { getAllCollectionsRouter } from './routes/collection/get-all-collections';
import { updateProfileImageRouter } from './routes/auth/update-profile-images';
import { createNFTRouter } from './routes/nft/create';
import { getNftsRouter } from './routes/nft/get';
import { getMyCollectionsRouter } from './routes/collection/get-my-collections';
import { getMyNftsRouter } from './routes/nft/get-my-nfts';
import { getCurrentUser } from './routes/auth/get-current-user';
import { getCurrentStore } from './routes/auth/get-current-store';
import { sellNftRouter } from './routes/nft/sell-nft';
import { getTopNftsRouter } from './routes/nft/get-top-nfts';
import { getTopCollectionsRouter } from './routes/collection/get-top-collections';
import { getNftRouter } from './routes/nft/get-nft';
import { getUsersRouter } from './routes/e2c-c2e/get-users';
import { getUserNftsRouter } from './routes/e2c-c2e/get-user-nfts';
import { getUserCollectionsRouter } from './routes/e2c-c2e/get-user-collections';
import { getDashboardDataRouter } from './routes/dashboard/get-data';
import { getCollectionNftsRouter } from './routes/nft/get-collection-nfts';
import { makeBidRouter } from './routes/nft/make-bid';
import { updateNftRouter } from './routes/nft/edit-nft';
import { buyNFTRouter } from './routes/nft/buy-nft';
import { viewNftBidsRouter } from './routes/nft/view-nft-bid';
import { approveBidRouter } from './routes/nft/approve-bid';
import { burnNftRouter } from './routes/nft/burn-nft';
import { getAuctionNftsRouter } from './routes/nft/auction-nfts';
import { cancelNftListingRouter } from './routes/nft/cancel-listing';
import { findUserRouter } from './routes/auth/find-user';
import { getHomePageData } from './routes/e2c-c2e/get-homepage-data';
import { getNftHistory } from './routes/nft/get-nft-history';
import { searchNft } from './routes/nft/search-nft';
import { makeBidOffer } from './routes/nft/make-bid-offer';
import { cancelBidOffer } from './routes/nft/cancel-bid-offer';
import { getListingFee } from './routes/auth/get-listing-fee';
import { updateListingFee } from './routes/auth/update-listing-fee';
import { addAuctionOffer } from './routes/nft/add-auction-offers';
import { cancelAuctionOffer } from './routes/nft/cancel-auction-offers';
import { approveAuctionOfferRouter } from './routes/nft/approve-auction-offer';
import { getHomeExploreNfts } from './routes/nft/get-home-explore-nfts';
import { getBlogs } from './routes/e2c-c2e/get-blogs';
import { updateCollectionRouter } from './routes/collection/update-collections';
import { deleteCollectionRouter } from './routes/collection/delete-collection';
import { getPages } from './routes/e2c-c2e/get-pages';
import { macDeviceTest } from './routes/auth/mac-device-test';
import { subscribeNotification } from './routes/auth/subscribe-notification';
import { sendNotification } from './routes/auth/push-notification';
import { getNotifications } from './routes/auth/get-notifications';
import { updateNotification } from './routes/auth/update-notification';
import { reportNftOrUserRouter } from './routes/user/report-nft-user';
import { updateNotificationSettingsRouter } from './routes/user/update-notification-settings';
import { getNotificationSettingsRouter } from './routes/user/get-notification-settings';
import { getSearchHistory } from './routes/user/search-history';
import { saveSearchHistory } from './routes/user/save-search-history';
import { clearSearchHistory } from './routes/user/clear-search-history';
import { getReportsRouter } from './routes/e2c-c2e/get-reports-data';
import { likeNft } from './routes/nft/like-nft';
import { unlikeNft } from './routes/nft/unlike-nft';
import { followUserRouter } from './routes/user/follow-user';
import { unfollowUserRouter } from './routes/user/unfollow-user';
import { addToWishlistRouter } from './routes/user/add-to-wishlist';
import { removeFromWishlistRouter } from './routes/user/remove-from-wishlist';
import { clearWishlistRouter } from './routes/user/clear-wishlist';
import { hideCollectionRouter } from './routes/collection/hide-collection';
import { getCollectionByIdRouter } from './routes/collection/get-collection-by-id';
import { endAuctionRouter } from './routes/nft/end-auction';
import { withdrawAuctionBid } from './routes/nft/withdraw-auction-bid';

import { getSocialMedia } from './routes/e2c-c2e/get-social-media';
import { getBlogCategories } from './routes/e2c-c2e/get-blog-categories';
import { addListingFeeRecipient } from './routes/e2c-c2e/add-listing-fee-recipient';
import { updateListingFeeRecipient } from './routes/e2c-c2e/update-listing-fee-recipient';
import { deleteListingFeeRecipient } from './routes/e2c-c2e/delete-listing-fee-recipient';

import { transferNftRouter } from './routes/nft/transfer-nft';
import { createAnOffer } from './routes/nft/create-an-offer';
import { acceptOfferRouter } from './routes/nft/approve-offer';
import { cancelOfferRouter } from './routes/nft/cancel-offer';

// test POST for one click
import { testPostForOneClick } from './routes/auth/test-post-for-1-click';

const app = express();
app.disable("x-powered-by");

// Sentry.init({
//     dsn: "https://0648ce40e66a480681c229b931a0140a@o4504127538659328.ingest.sentry.io/4504157493723136",
  
//     integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//     ],

//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
// });

const corsOptions: CorsOptions = {

    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        return callback(null, true);
    },
    // origin: ["*", "http://localhost:3000", "http://localhost:3001", "https://nft-user.herokuapp.com", "https://user.wimos.io"],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    allowedHeaders: ["Content-Type", "X-Requested-With", "X-HTTP-Method-Override", "Accept", "Authorization", "Baggage", "sentry-trace"]
};

// // The request handler must be the first middleware on the app
// app.use(Sentry.Handlers.requestHandler() as express.RequestHandler); 

// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// app.use(
//     Sentry.Handlers.errorHandler({
//       shouldHandleError(error) {
//         // Capture all 404 and 500 errors
//         if (error.status === 404 || error.status === 500 || error.status === 400) {
//           return true;
//         }
//         return false;
//       },
//     })
// );

// Limit request from the same IP
const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per 15 min
    windowMs: 15 * 60 * 1000, // 15 min
    message: 'Too Many Request from this IP, please try again in an hour'
});

// app.use(limiter);

// Setting cors policy
app.use(cors(corsOptions));

// Set security HTTP headers
// app.use(helmet());

// Express json middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Data sanitization against Nosql query injection
// app.use(mongoSanitize());

// Set security HTTP headers

app.use(cookieParser());

app.set('trust proxy', true);

// Cookie session
// app.use(
//     cookieSession({
//         signed: false,
//         secure: true,
//         httpOnly: false,
//         sameSite: "none"
//     })
// );

app.use(fileUpload());

app.use('/mac-device', macDeviceTest)
app.use('/send', sendNotification)
app.use('/test-post', testPostForOneClick)

app.use(GetStoreFromHost);

// Use all the routers

// __ auth routes __ \\
app.use('/v1/auth/login', loginRouter);
app.use('/v1/auth/logout', logoutRouter);
app.use('/v1/auth/current-user', getCurrentUser);
app.use('/v1/auth/current-store', getCurrentStore);
app.use('/v1/auth/update-profile', updateProfileRouter);
app.use('/v1/auth/update-profile-images', updateProfileImageRouter);
app.use('/v1/auth/get-user', findUserRouter);

// __ collection routes __ \\
app.use('/v1/collections/create', createCollectionRouter);
app.use('/v1/collections/all', getAllCollectionsRouter);
app.use('/v1/collection', getCollectionByIdRouter);
app.use('/v1/collections/mycollections', getMyCollectionsRouter);
app.use('/v1/collections/top', getTopCollectionsRouter);
app.use('/v1/collection', updateCollectionRouter)
app.use('/v1/collection', deleteCollectionRouter)
app.use('/v1/contract/get-contracts', getContractDataRouter);
app.use('/v1/collection/visibility', hideCollectionRouter)

// __ nft routes __ \\
app.use('/v1/nft/create', createNFTRouter);
app.use('/v1/nft/get', getNftsRouter);
app.use('/v1/nft/auction-nfts', getAuctionNftsRouter);
app.use('/v1/nft/mynfts', getMyNftsRouter);
app.use('/v1/nft/sellnft', sellNftRouter);
app.use('/v1/nft/top', getTopNftsRouter);
app.use('/v1/nft/home-explore', getHomeExploreNfts);
app.use('/v1/nft/collection', getCollectionNftsRouter);
app.use('/v1/nft/make-bid', makeBidRouter);
app.use('/v1/nft/update', updateNftRouter);
app.use('/v1/nft/buy', buyNFTRouter);
app.use('/v1/nft/view-bids', viewNftBidsRouter);
app.use('/v1/nft/approve-bid', approveBidRouter);
app.use('/v1/nft/burn-nft', burnNftRouter);
app.use('/v1/nft/cancel-listing', cancelNftListingRouter);
app.use('/v1/nft/history', getNftHistory);
app.use('/v1/nft/search', searchNft);
app.use('/v1/nft/bid-offer', makeBidOffer);
app.use('/v1/nft/cancel-offer', cancelBidOffer);
app.use('/v1/nft/auction-offer', addAuctionOffer);
app.use('/v1/nft/cancel-auction-offer', cancelAuctionOffer);
app.use('/v1/nft/approve-auction', approveAuctionOfferRouter)
app.use('/v1/nft/like', likeNft)
app.use('/v1/nft/unlike', unlikeNft)
app.use('/v1/nft/end-auction', endAuctionRouter)
app.use('/v1/nft/withdraw-auction-bid', withdrawAuctionBid)
app.use('/v1/nft/transfer', transferNftRouter)
app.use('/v1/nft/offer', createAnOffer);
app.use('/v1/nft/accept-offer', acceptOfferRouter);
app.use('/v1/nft/cancel-make-offer', cancelOfferRouter);

app.use('/v1/nft/', getNftRouter);

// __ c2e routes __ \\
app.use('/v1/e2c-c2e/get-users', getUsersRouter);
app.use('/v1/e2c-c2e/get-user-nfts', getUserNftsRouter);
app.use('/v1/e2c-c2e/get-user-collections', getUserCollectionsRouter);
app.use('/v1/e2c-c2e/home-page', getHomePageData);
app.use('/v1/e2c-c2e/blogs', getBlogs)
app.use('/v1/e2c-c2e/pages', getPages)
app.use('/v1/dashboard/get-data', getDashboardDataRouter);
app.use('/v1/auth/listing-fee', getListingFee)
app.use('/v1/auth/listing-fee', updateListingFee)
app.use('/v1/e2c-c2e/reports', getReportsRouter)
app.use('/v1/e2c-c2e/social-media', getSocialMedia)
app.use('/v1/e2c-c2e/blog-categories', getBlogCategories)
app.use('/v1/e2c-c2e/listing-fee-recipient', addListingFeeRecipient)
app.use('/v1/e2c-c2e/listing-fee-recipient', updateListingFeeRecipient)
app.use('/v1/e2c-c2e/listing-fee-recipient', deleteListingFeeRecipient)


// __ user routes __ \\

// Notifications
app.use('/v1/notification/subscribe', subscribeNotification) // web push notification
app.use('/v1/user/notifications', getNotifications) // normal notification
app.use('/v1/user/notification', updateNotification) // update for read or clear

app.use('/v1/user/report', reportNftOrUserRouter)
app.use('/v1/user/notification-settings', updateNotificationSettingsRouter)
app.use('/v1/user/notification-settings', getNotificationSettingsRouter)
app.use('/v1/user/search-history', getSearchHistory)
app.use('/v1/user/search-history', saveSearchHistory)
app.use('/v1/user/search-history', clearSearchHistory)
app.use('/v1/user/follow', followUserRouter)
app.use('/v1/user/unfollow', unfollowUserRouter)
app.use('/v1/user/wishlist', addToWishlistRouter)
app.use('/v1/user/wishlist', removeFromWishlistRouter)
app.use('/v1/user/wishlist', clearWishlistRouter)


// If route handler not found
app.all('*', async (req, res) => {
    res.status(404).json({
        status: false,
        message: "Not Found"
    });
});

// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler); 

// Error Handler
app.use(errorHandler);

// Exporting App Module
export { app };
