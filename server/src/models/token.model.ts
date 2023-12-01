import { Schema, Types, model } from "mongoose";
import { IRawToken, ITokenModel } from "../interfaces/token.interface";

const tokenSchema = new Schema<IRawToken, ITokenModel>({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    refreshToken: {
        type: String,
        requried: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

const tokenModel = model<IRawToken, ITokenModel>('Token', tokenSchema);

export default tokenModel;