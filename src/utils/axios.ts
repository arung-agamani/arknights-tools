import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://closure.howlingmoon.dev/api'
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://closure.howlingmoon.dev/api' : 'http://localhost:10000/api'
})

export default instance;