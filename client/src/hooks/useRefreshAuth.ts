import { useEffect } from 'react';
import { useFetching } from "./useFetching"
import { AuthService } from '../services/AuthService';
import { useAppDispatch } from './redux';
import { setUser } from '../store/slices/rootSlice';


export const useRefreshAuth = () => {

    const dispatch = useAppDispatch();

    const {isLoading, fetching} = useFetching(async () => {
        const response = await AuthService.refresh();
        dispatch(setUser(response.data));
    });

    useEffect(() => {
        fetching();
    }, []);

    return isLoading;
}