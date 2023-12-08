import React from 'react'
import styles from './Sidebar.module.scss';
import SidebarHeader from './SidebarHeader/SidebarHeader';

const Sidebar = () => {


    return (
        <div className={styles.sidebar}>
            <SidebarHeader />
        </div>
    )
}

export default Sidebar