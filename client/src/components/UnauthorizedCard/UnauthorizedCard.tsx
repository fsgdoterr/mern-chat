import React, { FC, PropsWithChildren } from 'react'
import Card from '../UI/Card/Card'
import styles from './UnauthorizedCard.module.scss';

interface UnauthorizedCardProps {
    header: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UnauthorizedCard: FC<PropsWithChildren<UnauthorizedCardProps>> = ({
    children,
    header,
    onSubmit,
}) => {
    return (
        <Card
            header={<h1>{header}</h1>}
            className={styles.card}
        >
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </Card>
    )
}

export default UnauthorizedCard