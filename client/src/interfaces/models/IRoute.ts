import { FC } from "react";

export enum MODIFIERS {
    PUBLIC = 'public',
    PRIVATE = 'private',
    ANY = 'any',
};

export default interface IRoute {
    path: string;
    component: FC;
    modifier: MODIFIERS,
    defaultRoute?: boolean;
}