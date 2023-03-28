import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://life-hacker.onrender.com:7777',
        withCredentials: true
    }
);