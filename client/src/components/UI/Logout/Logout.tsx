import React from 'react'
import Button from '../Button/Button'
import { useFetching } from '../../../hooks/useFetching'
import { AuthService } from '../../../services/AuthService';
import { useAppDispatch } from '../../../hooks/redux';
import { setUser } from '../../../store/slices/rootSlice';

const Logout = () => {

    const dispatch = useAppDispatch();

    const {isLoading, fetching} = useFetching(async () => {
        const response = await AuthService.logout();
        dispatch(setUser(undefined));
    });

    return (
        <Button
            loading={isLoading}
            onClick={fetching}
        >
            LOGOUT    
        </Button>
    )
}

export default Logout