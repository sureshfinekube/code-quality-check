import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@finekube/nft-client-common';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { getStoreWithDomainRouter } from './routes/get-store-with-domain';
import cors, { CorsOptions } from 'cors';
import { getClientRouter } from './routes/get-client';
import { getContractWithDomainRouter } from './routes/get-contract-with-domain';
import { getHomePageData } from './routes/get-home-page-data';
import { getListingFee } from './routes/get-listing-fee';
import { getBlogs } from './routes/get-blogs';
import { getPages } from './routes/get-pages';
import { rateLimit } from 'express-rate-limit';
import { getBlogCategories } from './routes/get-blog-categories';
import { getSocialMedia } from './routes/get-social-media';

// Importing Routes

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

// Cors Option
const corsOptions: CorsOptions = {
    origin: ["*", "http://localhost:3000", "http://localhost:3001", "https://nft-user.herokuapp.com", "https://portal.wimos.io"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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

// JSON middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// trust proxy
app.set('trust proxy', true);

// Cookie Session
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test"
    })
);

// All the routes here...
app.use('/api/c2e-e2c/get-store-with-domain', getStoreWithDomainRouter);
app.use('/api/c2e-e2c/get-client', getClientRouter);
app.use('/api/c2e-e2c/get-contract-with-domain', getContractWithDomainRouter)
app.use('/api/c2e-e2c/home-page', getHomePageData)
app.use('/api/c2e-e2c/store/listing-fee', getListingFee)
app.use('/api/c2e-e2c/blogs', getBlogs)
app.use('/api/c2e-e2c/blog-categories', getBlogCategories)
app.use('/api/c2e-e2c/pages', getPages)
app.use('/api/c2e-e2c/social-media', getSocialMedia)


//If route handler not found
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler()); 

// Error Handler
app.use(errorHandler)

// Exporting app module
export { app };
