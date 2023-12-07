import React, { FC, PropsWithChildren } from 'react'
import styles from './ErrorPlate.module.scss';

const ErrorPlate: FC<PropsWithChildren> = ({
  children
}) => {
    return (
        <p className={styles.error}>
            {children}
        </p>
    )
}

export default ErrorPlate