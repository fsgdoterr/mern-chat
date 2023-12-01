import { IRawToken, ITokens } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import jwt from 'jsonwebtoken';
import tokenModel from "../models/token.model";
import { HydratedDocument } from "mongoose";
import ApiError from "../utils/error";
import userModel from "../models/user.model";
import UserDTO from "../dtos/user.dto";

class TokenService {

    async generateAndBindTokens(userData: IUser): Promise<ITokens> {
        const { refreshToken, accessToken } = this.generateTokens(userData);

        const tokenDocument = await this.bindToken(userData.id, refreshToken);

        return { refreshToken, accessToken };
    }

    async bindToken(userId: string, refreshToken: string) : Promise<HydratedDocument<IRawToken>> {
        const token = await tokenModel.findOneAndUpdate({
            userId,
        }, {
            refreshToken
        }, { new: true, upsert: true });

        return token;
    }

    async refresh(refreshToken: string): Promise<ITokens> {
        const oldToken = await tokenModel.findOne({refreshToken});

        if(!oldToken)
            throw ApiError.unauthorized();

        const user = await userModel.findById(oldToken.userId);

        const userDto = new UserDTO(user!);

        return this.generateAndBindTokens(userDto.getDto());
    }

    async removeToken(refreshToken: string): Promise<boolean> {
        const token = await tokenModel.findOneAndDelete({
            refreshToken,
        });

        return !!token;
    }

    generateTokens(userData: IUser): ITokens {
        const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, {expiresIn: '7d'});
        const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, {expiresIn: '30m'});

        return { refreshToken, accessToken };
    }

}

export default new TokenService;