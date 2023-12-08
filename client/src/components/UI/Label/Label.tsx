import React, { FC, PropsWithChildren } from 'react'

interface LabelProps {
    label: string;
    preventDefault?: boolean;
}

const Label: FC<PropsWithChildren<LabelProps>> = ({
    children,
    label,
    preventDefault,
}) => {

    const clickHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
        if(preventDefault) e.preventDefault();
    }

    return (
        <label onClick={clickHandler}>
            <span className='label'>{label}</span>
            {children}
        </label>
    )
}

export default Label