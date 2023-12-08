import { AxiosResponse } from "axios";
import { $api } from "../config/axiosConfig";
import IUser from "../interfaces/models/IUser";

export default class UserService {

    static async forgotPassword(email: string): Promise<AxiosResponse> {
        const response = await $api.get(`/user/forgot-password/${email}`);
        return response;
    }

    static async changePassword(email: string, code: string, password: string, confirmPassword: string): Promise<AxiosResponse<IUser>> {
        const response = await $api.post<IUser>(`/user/change-password`, {
            email,
            code,
            password,
            confirmPassword
        });
        return response;
    }

    static async update(formData: FormData): Promise<AxiosResponse<IUser>> {
        const response = await $api.patch<IUser>(`/user/`, formData);
        return response;
    }

}