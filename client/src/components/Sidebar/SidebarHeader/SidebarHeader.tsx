import React from 'react'
import styles from './SidebarHeader.module.scss';
import Button from '../../UI/Button/Button';
import { MdOutlineAccountCircle } from "react-icons/md";
import Search from '../../Search/Search';
import { useModals } from '../../../hooks/useModals';
import { MODALS } from '../../../store/slices/modalSlice';

const SidebarHeader = () => {

    const { open } = useModals();

    return (
        <header className={styles.header}>
            <Button 
                className={styles.account}
                onClick={() => open(MODALS.ACCOUNT)}
            >
                <MdOutlineAccountCircle />
            </Button>
            <Search />
        </header>
    )
}

export default SidebarHeader