import { useState } from 'react';
import IApiError from '../interfaces/models/IApiError';
import axios from 'axios';

export const useFetching = <T extends (...args: any[]) => Promise<unknown> | unknown>(callback: T) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IApiError>({} as IApiError);

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch(e) {
            if(axios.isAxiosError(e)) {
                const err = e.response?.data as IApiError | undefined;
                if(err) {
                    setError(err);
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {isLoading, fetching, error};

}