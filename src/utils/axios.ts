import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://closure.howlingmoon.dev/api'
    baseURL: 'http://localhost:3001/api'
})

export default instance;