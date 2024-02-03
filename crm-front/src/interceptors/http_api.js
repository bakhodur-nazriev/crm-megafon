import axios from 'axios';

const authToken = localStorage.getItem('authToken');
const baseURL = process.env.VUE_APP_BACK_URL;
const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Authorization': authToken ? `Bearer ${authToken}` : sessionStorage.getItem('authToken'),
    },
});

export default {
    install: (app) => {
        app.config.globalProperties.$http = http;

        // Request interceptor
        http.interceptors.request.use(
            (config) => {
                // Modify the request config here (if needed)
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        http.interceptors.response.use(
            (response) => {
                // Modify the response here (if needed)
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    },
};
