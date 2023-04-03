import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://ms-sd.onrender.com',
        withCredentials: true
    }
);