import { Schema, model } from "mongoose";
import { IRawUser, IUserModel } from "../interfaces/user.interface";


const userSchema = new Schema<IRawUser, IUserModel>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    avatar: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: String,
    changePasswordCode: String,
    changePasswordTime: Date,
}, {
    timestamps: true,
    versionKey: false
});

const userModel = model<IRawUser, IUserModel>('User', userSchema);

export default userModel;