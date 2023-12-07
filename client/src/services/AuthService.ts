import { AxiosResponse } from 'axios';
import { $api } from '../config/axiosConfig';
import IUser from '../interfaces/models/IUser';

export class AuthService {

    static async signin(email: string, password: string): Promise<AxiosResponse<IUser>> {
        const response = await $api.post<IUser>('/auth/signin', {
            email,
            password
        });

        const accessToken = response.headers['access-token'];

        if(accessToken)
            localStorage.setItem('accessToken', accessToken);

        return response;
    }

    static async signup(email: string, password: string, confirmPassword: string): Promise<AxiosResponse<IUser>> {
        const response = await $api.post<IUser>('/auth/signup', {
            email,
            password,
            confirmPassword
        });

        const accessToken = response.headers['access-token'];

        if(accessToken)
            localStorage.setItem('accessToken', accessToken);

        return response;
    }

    static async refresh(): Promise<AxiosResponse<IUser>> {
        const response = await $api.get<IUser>('/auth/refresh');

        const accessToken = response.headers['access-token'];

        if(accessToken)
            localStorage.setItem('accessToken', accessToken);

        return response;
    }
    
    static async logout(): Promise<AxiosResponse> {
        const response = await $api.delete('/auth/logout');

        localStorage.removeItem('accessToken');

        return response;
    }

}