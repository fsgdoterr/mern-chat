import React, { FC, InputHTMLAttributes as DivHTMLAttributes, PropsWithChildren } from 'react'
import styles from './Card.module.scss';

interface CardProps extends DivHTMLAttributes<HTMLDivElement> {
    header?: string | JSX.Element;
    className?: string;
}

const Card: FC<PropsWithChildren<CardProps>> = ({
    children,
    header,
    className,
    ...rest
}) => {

    const cardClasses = [styles.card, className];

    return (
        <div className={cardClasses.join(' ')} {...rest}>
            {header &&
                <div className={styles.header}>
                    {header}
                </div>
            }
            <section className={styles.inner}>
                {children}
            </section>
        </div>
    )
}

export default Card