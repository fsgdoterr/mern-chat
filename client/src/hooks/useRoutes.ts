import IRoute, { MODIFIERS } from "../interfaces/models/IRoute";
import routes from "../routes";
import { useIsAuth } from "./useIsAuth"


export const useRoutes = () => {
    const isAuth = useIsAuth();

    const modifiers = [MODIFIERS.ANY];
    if(isAuth) modifiers.push(MODIFIERS.PRIVATE)
    else modifiers.push(MODIFIERS.PUBLIC);

    const rts = routes.filter(route => modifiers.includes(route.modifier));
    const defaultRoute = routes.find(route => modifiers.includes(route.modifier) && route.defaultRoute) as IRoute;

    return {
        routes: rts,
        defaultRoute
    };
}