import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import cors, { CorsOptions } from 'cors';
import fileUpload from 'express-fileupload';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import rateLimit from 'express-rate-limit'
import { NotFoundError, errorHandler } from '@finekube/nft-client-common';

// imporing routers
import { createBlogRouter } from './routes/create-blog';
import { updateBlogRouter } from './routes/update-blog';
import { removeBlogRouter } from './routes/remove-blog';
import { getBlogRouter } from './routes/get-blog';
import { getAllStoreBlogsRouter } from './routes/get-all-blogs';
import { getBlogImageRouter } from './routes/get-blog-image';

import { getAllStoreBlogCategoriesRouter } from './routes/get-all-blog-categories';
import { createBlogCategoryRouter } from './routes/create-blog-category';
import { updateBlogCategoryRouter } from './routes/update-blog-category';
import { removeBlogCategoryRouter } from './routes/remove-blog-category';

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



// Express json middlewares
app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ extended: false, limit: "1gb" }));

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
app.use('/api/blogs/get-blog/', getBlogRouter);
app.use('/api/blogs/get-blog-image/', getBlogImageRouter);
app.use('/api/blogs/get-blogs/', getAllStoreBlogsRouter)
app.use('/api/blogs/create', createBlogRouter);
app.use('/api/blogs/update', updateBlogRouter);
app.use('/api/blogs/remove', removeBlogRouter); 

// -- blog category
app.use('/api/blogs/category', getAllStoreBlogCategoriesRouter)
app.use('/api/blogs/category', createBlogCategoryRouter);
app.use('/api/blogs/category', updateBlogCategoryRouter);
app.use('/api/blogs/category', removeBlogCategoryRouter); 

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
