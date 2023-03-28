import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://ms-chat.onrender.com',
        withCredentials: true
    }
);