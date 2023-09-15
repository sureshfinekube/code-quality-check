import axios from 'axios';

const E2BInstance = axios.create({
    // baseURL: 'https://spadmin.wimos.io/',
    baseURL: 'https://spapi.wimos.io/',

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

export { E2BInstance as E2B };  