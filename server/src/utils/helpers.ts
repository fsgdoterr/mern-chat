import { FieldValidationError } from "express-validator";


export const prepareErrors = (errs: FieldValidationError[]) => errs.map(err => ({message: err.msg, field: err.path}));