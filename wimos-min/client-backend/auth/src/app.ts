import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import cors, { CorsOptions } from 'cors';
import { NotFoundError, errorHandler } from '@finekube/nft-client-common';
import { CheckPackageExpire } from './helpers/package-expire/package-expire';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import rateLimit from 'express-rate-limit'


// Importing Routers
import { signinRouter } from './routes/signin';
import { currentClientRouter } from './routes/get-current-client';
import { signoutRouter } from './routes/signout';
import { createEmailOtpRouter } from './routes/create-email-otp';
import { verifyEmailRouter } from './routes/verify-email-otp';
import { updateClientRouter } from './routes/update-client';
import { changeClientPasswordRouter } from './routes/change-password';
import { updateRegistrationStepRouter } from './routes/registration-step';
import { forgotPasswordRouter } from './routes/forgot-password';
import { verifyForgotPasswordRouter } from './routes/verify-forgot-password';
import { createApiRouter } from './routes/create-api';
import { verifyCreateApi } from './routes/verify-createApi';
import { getCreateApi } from './routes/get-createApi';
import { checkUsername } from './routes/check-username';
import { saveContractAddress } from './routes/save-contract-address';
import { updateSharedContractData } from './routes/update-shared-contract-data';

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
    // allowedHeaders: ["Content-Type", "X-Requested-With", "X-HTTP-Method-Override", "Accept", "Authorization", 'Access-Control-Allow-Origin']
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

// Limit request from the same IP
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per 15 min
  windowMs: 15 * 60 * 1000, // 15 min
  message: 'Too Many Request from this IP, please try again in an hour'
});

// app.use(limiter);

// Express json middlewares
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

// app.use(CheckPackageExpire)

// All the routes here...
app.use('/api/auth/update', updateClientRouter);
app.use('/api/auth/change-password', changeClientPasswordRouter);
app.use('/api/auth/signin', signinRouter);
app.use('/api/auth/currentclient', currentClientRouter);
app.use('/api/auth/signout', signoutRouter);
app.use('/api/auth/otp-verification/create', createEmailOtpRouter);
app.use('/api/auth/otp-verification/verify', verifyEmailRouter);
app.use('/api/auth/update-step', updateRegistrationStepRouter);
app.use('/api/auth/forgot-password', forgotPasswordRouter);
app.use('/api/auth/verify-forgot-password', verifyForgotPasswordRouter);
app.use('/api/auth/create-api', createApiRouter);
app.use('/api/auth/verify-api', verifyCreateApi);
app.use('/api/auth/check-username', checkUsername)
app.use('/api/auth/abi-details', getCreateApi);
app.use('/api/auth/contract-address', saveContractAddress);
app.use('/api/auth/shared-contract', updateSharedContractData)

//If route handler not found
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler()); 

// Error Handler
app.use(errorHandler)

// Exporting App Module
export { app };
