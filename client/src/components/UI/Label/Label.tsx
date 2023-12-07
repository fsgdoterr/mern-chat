import React, { FC, PropsWithChildren } from 'react'

interface LabelProps {
    label: string;
}

const Label: FC<PropsWithChildren<LabelProps>> = ({
    children,
    label,
}) => {
    return (
        <label>
            <span className='label'>{label}</span>
            {children}
        </label>
    )
}

export default Label