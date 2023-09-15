import axios from 'axios';

const E2CInstance = axios.create({
    // baseURL: process.env.ENV == 'DEV' ? process.env.DEV_PORTAL_BASEURL : process.env.LIVE_PORTAL_BASEURL,
    baseURL: 'https://lb.wimos.io/api/',
    // baseURL: 'https://devlb.wimos.io/api/',
    // baseURL: 'http://localhost:4000/api/',

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 20000
});

export { E2CInstance as E2C };