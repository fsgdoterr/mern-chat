import { useAppSelector } from "./redux";

export const useIsAuth: () => boolean = () => !!useAppSelector(state => state.root.user);