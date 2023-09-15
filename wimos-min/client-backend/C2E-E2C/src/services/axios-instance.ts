import axios from 'axios';

// baseURL: 'https://nft-admin-panel.herokuapp.com/',

const C2BInstance = axios.create({
    baseURL: 'https://spapi.wimos.io/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

export { C2BInstance as C2B };  