import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import ApiError from "../utils/error";
import { prepareErrors } from "../utils/helpers";

export default (req: Request, res: Response, next: NextFunction) => {

    const result = validationResult(req);

    if(!result.isEmpty())
        throw ApiError.badRequest('Validation error', prepareErrors(result.array() as FieldValidationError[]));

    next();
}