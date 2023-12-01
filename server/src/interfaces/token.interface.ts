import { Model, Types } from "mongoose";

export interface IRawToken {
    userId: Types.ObjectId;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenModel extends Model<IRawToken> {};