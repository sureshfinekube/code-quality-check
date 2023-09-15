import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';

import type { ErrorRequestHandler } from "express";

import { B2CC2BRouter } from './router/b2c-c2b-route';
import AdminAuthApi from './router/adminAuthApi';
import ClientApi from './router/clientApi';
import AdminApi from './router/adminApi';
import PackageApi from './router/packageApi';
import ContractFeatureApi from './router/contract-feature';
import mongoConnect from './config/mongoose/mongoose-conn';
import rateLimit from 'express-rate-limit'

dotenv.config();

const corsOptions: CorsOptions = {

    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        return callback(null, true);
    },
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    allowedHeaders: ["Content-Type", "X-Requested-With", "X-HTTP-Method-Override", "Accept"]
};

const app = express();

// Limit request from the same IP
const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per 15 min
    windowMs: 15 * 60 * 1000, // 15 min
    message: 'Too Many Request from this IP, please try again in an hour'
});

// app.use(limiter);

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false, limit: '100mb' }));


app.use("/auth/api", AdminAuthApi);

app.use("/client/api", ClientApi);

app.use("/admin/api", AdminApi);

app.use("/package/api", PackageApi)

app.use('/b2c-c2b/api/', B2CC2BRouter);

app.use('/api/contract-features', ContractFeatureApi)

//If route handler not found
app.all('*', async (req, res) => {
    res.status(404).json({ status: false, message: 'Not found' })
});


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.end();
};

app.use(errorHandler);

// error handler
app.use(function (err, req, res, next) {
    if (err.code == 'EBADCSRFTOKEN') {
        res.status(403).json({ status: false })
    }
    else {
        res.status(500).send(err.message);
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    mongoConnect();
});

