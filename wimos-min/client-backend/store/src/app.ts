import express from 'express';
import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@finekube/nft-client-common';
import fileUpload from 'express-fileupload';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

// Importing Route Handlers
import { createStoreRouter } from './routes/create-store';
import { getStoreRouter } from './routes/get-store';
import { deleteStoreRouter } from './routes/delete-store';
import { updateStoreRouter } from './routes/update-store';
import { checkDomainRouter } from './routes/check-domain';
import { getClientStoresRouter } from './routes/get-client-stores';
import { updateStoreStatusRouter } from './routes/update-store-status';
import { selectStorePackageRouter } from './routes/select-package';
import { createCategoryRouter } from './routes/create-category';
import { updateCategoryRouter } from './routes/update-category';
import { removeCategoryRouter } from './routes/remove-category';
import { addSeoContents } from './routes/add-seo-contents';

import { contractFeatures } from './routes/save-contract-features';

import { createCreationStepRouter } from './routes/add-creation-steps';
import { updateCreationStepRouter } from './routes/update-creation-steps';
import { getCreationStepsRouter } from './routes/get-creation-steps';
import { deleteCreationStepRouter } from './routes/delete-creation-step';

import { updateThemeTitle } from './routes/update-theme-title';
import { getThemeTitle } from './routes/get-theme-title';

import { addUserProfilePicture } from './routes/add-user-profile-picture';
import { deleteUserProfilePicture } from './routes/delete-profile-picture';

import { saveContractStandard } from './routes/save-contract-standard';
import { saveMetamaskId } from './routes/save-metamaskId';

import { updateListingFee } from './routes/update-listing-fee';
import { createContractPayload } from './routes/create-contract-payload';
import { updateStoreStep } from './routes/update-store-step';
import { addOrUpdateGoogleAnalyticsData } from './routes/add-update-google-analytics';
import { addSocialMediaLinkRouter } from './routes/add-social-media';
import { updateSocialMediaLinkRouter } from './routes/update-social-media';
import { getSocialMediaLinkRouter } from './routes/get-social-media';
import { deleteSocialMediaLinkRouter } from './routes/delete-social-media';
import { updateContactDetails } from './routes/update-contact-details'
import { addListingFeeRecipient } from './routes/add-listing-fee-recipient';
import { updateListingFeeRecipient } from './routes/update-listing-fee-recipient';
import { deleteListingFeeRecipient } from './routes/delete-listing-fee-recipient';

import {rateLimit} from 'express-rate-limit'

const app = express();

Sentry.init({
    dsn: "https://a6e3906d05b74012a43e6b2ec1818dd7@o4504127538659328.ingest.sentry.io/4504161851736064",
  
    integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const corsOptions: CorsOptions = {
    origin: ["*", "http://localhost:3000", "http://localhost:3001", "https://portal.wimos.io"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "X-Requested-With", "X-HTTP-Method-Override", "Accept", "Authorization", "Access-Control-Allow-Origin", "Baggage", "sentry-trace"]
};


// Sentry middlewares
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler()); 

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if (error.status === 404 || error.status === 500) {
          return true;
        }
        return false;
      },
    })
);

const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per 15 min
  windowMs: 15 * 60 * 1000, // 15 min
  message: 'Too Many Request from this IP, please try again in an hour'
});

// app.use(limiter);

app.use(express.json());

// Express json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.set('trust proxy', true);


// Cookie session
app.use(
    cookieSession({
        signed: false,
        secure: true,
        sameSite: "none"
    })
);

app.use(fileUpload());

// All the routes here...
app.use('/api/store/check-domain', checkDomainRouter);
app.use('/api/store/create', createStoreRouter);
app.use('/api/store/get-stores', getClientStoresRouter);
app.use('/api/store/update-status', updateStoreStatusRouter);
app.use('/api/store/select-package', selectStorePackageRouter);
app.use('/api/store/create-category', createCategoryRouter);
app.use('/api/store/update-category', updateCategoryRouter);
app.use('/api/store/remove-category', removeCategoryRouter);
app.use('/api/store/seo', addSeoContents);

app.use('/api/store/contract-features', contractFeatures)

// == THEME CUSTOMIZATION == \\

// Creation Step
app.use('/api/store/creation-step', createCreationStepRouter)
app.use('/api/store/creation-step', updateCreationStepRouter)
app.use('/api/store/creation-step', getCreationStepsRouter)
app.use('/api/store/creation-step', deleteCreationStepRouter)

// Theme titles
app.use('/api/store/theme-title', updateThemeTitle)
app.use('/api/store/theme-title', getThemeTitle)

// User logo
app.use('/api/store/user-profile-picture', addUserProfilePicture)
// app.use('/api/store/user-profile-picture', getUserProfilePicture)
app.use('/api/store/user-profile-picture', deleteUserProfilePicture)

app.use('/api/store/save-contract-standard', saveContractStandard)
app.use('/api/store/save-metamaskId', saveMetamaskId)

app.use('/api/store/listing-fee', updateListingFee)

app.use('/api/store/contract-payload', createContractPayload)
app.use('/api/store/update-step', updateStoreStep);

// Google Analytics
app.use('/api/store/ga-id', addOrUpdateGoogleAnalyticsData)

app.use('/api/store/social-media', getSocialMediaLinkRouter);
app.use('/api/store/social-media', addSocialMediaLinkRouter);
app.use('/api/store/social-media', updateSocialMediaLinkRouter);
app.use('/api/store/social-media', deleteSocialMediaLinkRouter);

app.use('/api/store/contact-details', updateContactDetails)

app.use('/api/store/listing-fee-recipient', addListingFeeRecipient)
app.use('/api/store/listing-fee-recipient', updateListingFeeRecipient)
app.use('/api/store/listing-fee-recipient', deleteListingFeeRecipient)

app.use('/api/store/', getStoreRouter);
app.use('/api/store/', deleteStoreRouter);
app.use('/api/store/', updateStoreRouter);

// Contract standard

//If route handler not found
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler()); 

// Error Handler
app.use(errorHandler)

// Exporting the app module
export { app };
