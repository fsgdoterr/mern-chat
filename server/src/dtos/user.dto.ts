import { HydratedDocument } from "mongoose";
import { IRawUser, IUser } from "../interfaces/user.interface";

export default class UserDTO {

    constructor(
        private user: HydratedDocument<IRawUser>
    ) {}

    getDto(): IUser {
        return {
            id: this.user._id.toString(),
            email: this.user.email,
            name: this.user.name,
            isVerified: this.user.isVerified,
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt,
        };
    }

}