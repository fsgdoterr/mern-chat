import { FieldValidationError } from "express-validator";


export const prepareErrors = (errs: FieldValidationError[]) => errs.map(err => ({message: err.msg, field: err.path}));

export const prepareFileSize = (size: number): string => {
    const arr = ['b', 'kb', 'mb', 'gb', 'tb'];
    let dimensions = 0;

    while(size <= 1000) {
        size /= 1000;
        dimensions++;
    }

    return `${size.toFixed(2)} ${arr[dimensions]}`;
}

export const apiUrl = (path: string): string => {
    const url = new URL(`api/v${process.env.API_VERSION}/${path}`.replace(/\/{2,}/g, '/'), process.env.API_URL);
    return url.href;
}