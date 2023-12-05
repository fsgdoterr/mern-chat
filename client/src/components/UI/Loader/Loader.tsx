import React, { FC } from 'react'
import styles from './Loader.module.scss';

interface LoaderProps {
    variant?: 'light' | 'dark';
}

const Loader: FC<LoaderProps> = ({
    variant = 'light',
}) => {
    return (
        <div className={[styles.pounds, styles[variant]].join(' ')}>
            <div className={[styles.pound, styles.pound1].join(' ')}></div>
            <div className={[styles.pound, styles.pound2].join(' ')}></div>
            <div className={[styles.pound, styles.pound3].join(' ')}></div>
        </div>
    )
}

export default Loader