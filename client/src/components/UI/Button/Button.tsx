import React, { ButtonHTMLAttributes, useState, PropsWithChildren, forwardRef, useRef } from 'react'
import styles from './Button.module.scss';
import Loader from '../Loader/Loader';
import uuid from 'react-uuid';

export enum BUTTON_VARIANT {
    TRANSPARENT = 'transparent',
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
}

interface IPoint {
    id: string;
    x: number;
    y: number;
    size: number;
    time: number;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    variant?: BUTTON_VARIANT,
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
    children,
    className,
    onClick,
    loading = false,
    variant = BUTTON_VARIANT.BLACK,
    ...rest
}, ref) => {

    const buttonClasses = [styles.button, styles[variant], className];
    if(loading) buttonClasses.push(styles.loading);
    
    const [points, setPoints] = useState<IPoint[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

        const newPoint = {
            id: uuid(),
            x: clientX - left,
            y: clientY - top,
            size: width >= height ? width : height,
            time: Date.now(),
        }

        setPoints(prevState => [newPoint, ...prevState]);

        if(timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setPoints([]);
        }, 400);

        onClick?.(e);
    }

    return (
        <button
            className={buttonClasses.join(' ')}
            {...rest}
            onClick={clickHandler}
            disabled={rest.disabled || loading}
            ref={ref}
        >
            <div className={styles.points}>
                {points.map(point => 
                    <div 
                        key={point.id}
                        className={styles.point}
                        style={{
                            width: point.size,
                            height: point.size,
                            top: point.y,
                            left: point.x
                        }}
                    ></div>    
                )}
            </div>
            <section>
                {children}
            </section>
            {loading &&
                <div className={styles.loader}>
                    <Loader />
                </div>
            }
        </button>
    )
})

export default Button