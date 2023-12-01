import { Model } from "mongoose";

export interface IRawUser {
    email: string;
    name: string;
    password: string;
    avatar?: string;
    isVerified: boolean;
    verificationCode?: string;
    changePasswordCode?: string;
    changePasswordTime?: Date;
    createdAt: Date;
    updatedAt: Date;
};

export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserModel extends Model<IRawUser> {};