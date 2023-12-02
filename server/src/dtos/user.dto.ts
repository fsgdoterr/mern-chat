import { HydratedDocument } from "mongoose";
import { IPublicUser, IRawUser, IRawUserMethods, IUser } from "../interfaces/user.interface";

export default class UserDTO {

    constructor(
        private user: HydratedDocument<IRawUser, IRawUserMethods>
    ) {}

    getDto(): IUser {
        return {
            id: this.user._id.toString(),
            email: this.user.email,
            name: this.user.name,
            avatar: this.user.getAvatarUrl(),
            isVerified: this.user.isVerified,
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt,
        };
    }

    getPublicDto(): IPublicUser {
        return {
            id: this.user._id.toString(),
            name: this.user.name,
            avatar: this.user.getAvatarUrl(),
        };
    }

}