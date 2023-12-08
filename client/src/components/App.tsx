import React, { useEffect } from 'react'
import '../assets/styles/app.scss';
import AppRouter from './AppRouter';
import { useRefreshAuth } from '../hooks/useRefreshAuth';
import Loader from './UI/Loader/Loader';
import { useIsAuth } from '../hooks/useIsAuth';
import Sidebar from './Sidebar/Sidebar';
import Modals from './UI/Modals/Modals';
import Modal from './UI/Modal/Modal';
import AccountModal from './Modals/AccountModal/AccountModal';
import UpdateAccount from './Modals/UpdateAccount/UpdateAccount';
import ChangePassword from './Modals/ChangePassword/ChangePassword';
import { useModals } from '../hooks/useModals';

const App = () => {

    const { closeModals } = useModals();
    const isAuth = useIsAuth();
    const isLoading = useRefreshAuth();

    useEffect(() => {
        closeModals();
    }, [isAuth])

    if(isLoading) {
        return(
            <div className='app h-full flex flex-center'>
                <Loader variant='dark'/>
            </div>
        );
    }

    const appClasses = ['app'];
    if(isAuth) appClasses.push('app-authed');

    return (
        <div className={appClasses.join(' ')}>
            <Modals>
                {isAuth && <AccountModal />}
                {isAuth && <UpdateAccount />}
                {isAuth && <ChangePassword />}
            </Modals>
            {isAuth && <Sidebar />}
            <AppRouter />
        </div>
    )
}

export default App