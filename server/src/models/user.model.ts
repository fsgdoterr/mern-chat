import { CallbackWithoutResultAndOptionalError, Schema, model } from "mongoose";
import { MongoServerError } from 'mongodb'
import { IRawUser, IRawUserMethods, IUserModel } from "../interfaces/user.interface";
import ApiError from "../utils/error";
import { apiUrl } from "../utils/helpers";


const userSchema = new Schema<IRawUser, IUserModel, IRawUserMethods>({
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

userSchema.post('findOneAndUpdate', (err: any, res: any, next: CallbackWithoutResultAndOptionalError) => {
    if(err instanceof MongoServerError && err.code === 11000 && err.keyPattern.email) {
        return next(ApiError.badRequest('Email duplication error'));
    }
    next();
});

userSchema.method('getAvatarUrl', function getAvatarUrl() {
    if(!this.avatar) return '';
    return apiUrl(`/public/image/${this.avatar}`);
})

const userModel = model<IRawUser, IUserModel>('User', userSchema);

export default userModel;