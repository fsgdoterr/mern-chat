import IUser from "../interfaces/models/IUser";
import { useAppSelector } from "./redux";


export const useAccount = () => useAppSelector(state => state.root.user) as IUser;