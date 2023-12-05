import React, { InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    icon?: JSX.Element;
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    icon,
    error,
    ...rest
}, ref) => {

    const inputClasses = [styles.input];
    if(rest.readOnly) inputClasses.push(styles.readOnly);
    if(error) inputClasses.push(styles.error);
    if(className) inputClasses.push(className);

    return (
        <div className={inputClasses.join(' ')}>
            {icon &&
                <div className={styles.icon}>
                    {icon}
                </div>
            }
            <input 
                ref={ref}
                {...rest}
            />
        </div>
    )
})

export default Input