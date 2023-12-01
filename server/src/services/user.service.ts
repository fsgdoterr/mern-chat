import { UploadedFile } from "express-fileupload";
import userModel from "../models/user.model";
import ApiError from "../utils/error";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import fileService from "./file.service";
import UserDTO from "../dtos/user.dto";
import { IUser } from "../interfaces/user.interface";
import mailService from "./mail.service";

class UserService {

    // async create(
    //     email: string, 
    //     password: string, 
    //     name?: string, 

    //     ): Promise<void> {
    //     const candidate = await userModel.findOne({email});

    //     if(candidate)
    //         throw ApiError.badRequest('A user with this email is already registered');

    //     const hashPassword = await bcrypt.hash(password, 3);
    //     const verificationCode = v4();
    //     const _name = name || `${email.split('@').shift()}_${v4()}`;

    
    // }

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

    async signin(email: string, password: string): Promise<IUser> {

        const candidate = await userModel.findOne({email});
        
        if(!candidate)
            throw ApiError.badRequest('No user with this email and password pair was found')
        
        const isEqual = await bcrypt.compare(password, candidate.password);
        
        if(!isEqual)
            throw ApiError.badRequest('No user with this email and password pair was found')

        const userDto = new UserDTO(candidate);

        return userDto.getDto();
    }

}

export default new UserService;