import { useState, useEffect } from 'react';
import { FieldErrors, FieldValues, GlobalError } from "react-hook-form";
import IApiError from "../interfaces/models/IApiError";
import IErrors from "../interfaces/models/IErrors";



export const useErrorHandling = <T extends FieldValues>(
    errors: Record<string, GlobalError>,
    error: IApiError,
    dependencies: any[],
) => {

    const [fieldErrors, setFieldErrors] = useState<IErrors>({});

    useEffect(() => {
        const newErrors: IErrors = {};
        for(const key in errors) {
            newErrors[key] = errors[key]?.message || '';
        }
        if(error) {
            newErrors.global = error.message;
        }
        setFieldErrors(newErrors);
    }, [...dependencies, error]);

    return fieldErrors;
}