import { UploadedFile } from "express-fileupload";
import userModel from "../models/user.model";
import ApiError from "../utils/error";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import fileService from "./file.service";
import UserDTO from "../dtos/user.dto";
import { IPublicUser, IUser } from "../interfaces/user.interface";
import mailService from "./mail.service";
import { TIME } from "../utils/const";
import path from "path";

class UserService {

    async create(
        email: string,
        password: string,
        sendMail: boolean,
        name?: string,
        isVerified?: boolean,
        uploadedAvatar?: UploadedFile,
    ): Promise<IUser> {

        const candidate = await userModel.findOne({email});

        if(candidate)
            throw ApiError.badRequest('A user with this email is already registered');

        const hashPassword = await bcrypt.hash(password, 3);
        const verificationCode = v4();

        name = name || `${email.split('@').shift()}_${v4()}`;
        isVerified = isVerified || false;

        let avatar = undefined;

        if(uploadedAvatar) {
            const { fileName } = await fileService.uploadFile(uploadedAvatar);
            avatar = fileName;
        }

        const user = await userModel.create({
            email,
            password: hashPassword,
            name,
            avatar,
            isVerified,
            verificationCode,
        });

        await mailService.sendVerfificationMessage(email, verificationCode);

        const userDto = new UserDTO(user);

        return userDto.getDto();
    }

    async signin(
        email: string,
        password: string
    ): Promise<IUser> {

        const candidate = await userModel.findOne({email});
        
        if(!candidate)
            throw ApiError.badRequest('No user with this email and password pair was found')
        
        const isEqual = await bcrypt.compare(password, candidate.password);
        
        if(!isEqual)
            throw ApiError.badRequest('No user with this email and password pair was found')

        const userDto = new UserDTO(candidate);

        return userDto.getDto();
    }

    async generateVerificationCode(
        userId: string, 
        sendMail: boolean
    ): Promise<string> {
        const verificationCode = v4();

        const user = await userModel.findByIdAndUpdate(userId, {verificationCode}, {new: true});

        if(sendMail)
            await mailService.sendVerfificationMessage(user!.email, verificationCode);

        return verificationCode;
    }

    async verif(
        userId: string, 
        verificationCode: string
    ): Promise<void> {
        const user = await userModel.findById(userId);

        if(!user)
            throw ApiError.badRequest('Invalid userId');

        if(user.verificationCode !== verificationCode)
            throw ApiError.badRequest('Invalid verificationCode');

        user.isVerified = true;

        await user.save();
    }

    async forgotPassword(
        email: string, 
        sendMail: boolean
    ): Promise<string> {
        const user = await userModel.findOne({email});

        if(!user)
            throw ApiError.badRequest(`The user with the email address does not exist`);

        const changePasswordCode = v4();

        user.changePasswordCode = changePasswordCode;
        user.changePasswordTime = new Date();

        await user.save();

        if(sendMail)
            await mailService.forgotPassword(email, changePasswordCode);

        return changePasswordCode;
    }

    async changePassword(
        email: string, 
        code: string, 
        password: string
    ): Promise<IUser> {

        const candidate = await userModel.findOne({
            email,
            changePasswordCode: code,
            changePasswordTime: {$gt: new Date(Date.now() - 5 * TIME.MINUTE)}
        });

        if(!candidate)
            throw ApiError.badRequest('There is no user with this email, either the code is incorrect, or the code is invalid');

        const newPasword = await bcrypt.hash(password, 3);

        candidate.password = newPasword;
        await candidate.save();

        const userDto = new UserDTO(candidate);

        return userDto.getDto();
    }

    async update(
        id: string, 
        name?: string, 
        email?: string, 
        avatar?: UploadedFile | boolean,
        isVerified?: boolean,
    ): Promise<IUser> {


        const user = await userModel.findByIdAndUpdate(id, {
            name,
            email,
            isVerified: 
                typeof isVerified !== 'undefined'
                ? isVerified 
                : email
                ? false
                : undefined
        }, { new: true });

        if(!user)
            throw ApiError.badRequest('Invalid userId');

        if(typeof avatar === 'boolean' && !avatar && user.avatar) {
            const avatarName = user.avatar;
            user.avatar = undefined;
            await user.save();

            const avatarPath = path.resolve(__dirname, '..', '..', 'public', 'image', avatarName);

            await fileService.removeFile(avatarPath);
        } 
        else if(typeof avatar === 'object') {
            const oldAvatarName = user?.avatar;

            const { fileName } = await fileService.uploadFile(avatar);
            user.avatar = fileName;

            await user.save();

            if(oldAvatarName) {
                const oldAvatarPath = path.resolve(__dirname, '..', '..', 'public', 'image', oldAvatarName);
                await fileService.removeFile(oldAvatarPath);
            }
        }

        const userDto = new UserDTO(user);

        return userDto.getDto();
    }

    async getAll(
        id: string,
        limit: number = 10,
        offset: number = 0,
        _public: boolean,
        search?: string,
    ): Promise<IUser[] | IPublicUser[]> {

        let users;
        if(search) {
            users = await userModel.find({
                name: new RegExp(search, 'i'),
                _id: {$ne: id},
            }).limit(limit).skip(offset);
        }

        else {
            users = await userModel.find({
                _id: {$ne: id},
            }).limit(limit).skip(offset);
        }

        const userDtos = users.map(u => new UserDTO(u));

        if(!_public) return userDtos.map(dto => dto.getDto());
        
        return userDtos.map(dto => dto.getPublicDto());
    }

}

export default new UserService;