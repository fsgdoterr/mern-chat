import axios, { AxiosRequestConfig } from "axios";
import IUser from "../interfaces/models/IUser";

export const API_VERSION = 1;

export const API_URL = `http://localhost:5000/api/v${API_VERSION}`;

const config: AxiosRequestConfig = {
    baseURL: API_URL,
    withCredentials: true,
}

export const $api = axios.create(config);

$api.interceptors.response.use((config) => {
    const accessToken = config.headers['access-token'];

    if(accessToken)
        localStorage.setItem('accessToken', accessToken);

    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<IUser>(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('accessToken', response.headers['access-token']);
            return $api.request(originalRequest);
        } catch(e) {
            console.log('Unauthorized');
        }
    }
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

    return config;
})