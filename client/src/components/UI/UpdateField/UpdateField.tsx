import React, { FC, InputHTMLAttributes, useState } from 'react'
import styles from './UpdateField.module.scss';
import Input from '../Input/Input';
import Button, { BUTTON_VARIANT } from '../Button/Button';
import { FaPencilAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { UseFormRegisterReturn } from 'react-hook-form';

interface UpdateFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    initialValue: string;
    inputProps: UseFormRegisterReturn;
    noteditCllbck?: () => void;
}

const UpdateField: FC<UpdateFieldProps> = ({
    initialValue,
    inputProps,
    noteditCllbck,
}) => {

    const [edit, setEdit] = useState<boolean>(false);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if(edit && noteditCllbck) noteditCllbck(); 
        setEdit(!edit);
    }

    return (
        <div className={styles.updateField}>
            {edit 
                ?
                    <Input 
                        className={styles.input}
                        {...inputProps}
                    />
                :
                <p className={styles.inputReadonly}>{initialValue}</p>
            }
            <Button
                className={styles.button}
                onClick={clickHandler}
                variant={edit ? BUTTON_VARIANT.RED : BUTTON_VARIANT.BLUE}
            >
                {edit 
                    ? <IoMdArrowRoundBack /> 
                    : <FaPencilAlt />
                }
            </Button>
        </div>
    )
}

export default UpdateField