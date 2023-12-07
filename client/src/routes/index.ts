import IRoute, { MODIFIERS } from "../interfaces/models/IRoute";
import Empty from "../pages/Empty/Empty";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

const routes: IRoute[] = [
    {
        path: '/signin',
        component: SignIn,
        modifier: MODIFIERS.PUBLIC,
        defaultRoute: true,
    },
    {
        path: '/signup',
        component: SignUp,
        modifier: MODIFIERS.PUBLIC,
    },
    {
        path: '/forgot',
        component: ForgotPassword,
        modifier: MODIFIERS.PUBLIC,
    },
    {
        path: '/',
        component: Empty,
        modifier: MODIFIERS.PRIVATE,
        defaultRoute: true,
    },
];

export default routes;