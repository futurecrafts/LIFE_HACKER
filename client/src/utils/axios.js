import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://life-hacker.onrender.com',
        withCredentials: true
    }
);