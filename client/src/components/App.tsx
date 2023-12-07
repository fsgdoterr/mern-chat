import React from 'react'
import '../assets/styles/app.scss';
import AppRouter from './AppRouter';
import { useRefreshAuth } from '../hooks/useRefreshAuth';
import Loader from './UI/Loader/Loader';

const App = () => {

    const isLoading = useRefreshAuth();

    if(isLoading) {
        return(
            <div className='app h-full flex flex-center'>
                <Loader variant='dark'/>
            </div>
        );
    }

    return (
        <div className='app'>
            <AppRouter />
        </div>
    )
}

export default App