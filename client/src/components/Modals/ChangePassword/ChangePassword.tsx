import React, { useState } from 'react'
import styles from './ChangePassword.module.scss';
import Modal from '../../UI/Modal/Modal';
import { useModals } from '../../../hooks/useModals';
import { MODALS } from '../../../store/slices/modalSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/redux';
import { useFetching } from '../../../hooks/useFetching';
import UserService from '../../../services/UserService';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { setUser } from '../../../store/slices/rootSlice';
import Label from '../../UI/Label/Label';
import Input from '../../UI/Input/Input';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import ErrorPlate from '../../UI/ErrorPlate/ErrorPlate';
import { FaBarcode } from 'react-icons/fa6';
import { TbPassword } from 'react-icons/tb';
import Button from '../../UI/Button/Button';

interface FormValues {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}

const ChangePassword = () => {

    const { isOpen, back } = useModals();

    const backClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        back();
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<FormValues>();
    const [step, setStep] = useState<0 | 1>(0);

    const dispatch = useAppDispatch();

    const {isLoading, fetching, error} = useFetching<SubmitHandler<FormValues>>(async (data) => {
        if(step === 0) await sendCode(data);
        else if(step === 1) await changePassword(data);
    });

    const sendCode: SubmitHandler<FormValues> = async ({email}) => {
        const response = await UserService.forgotPassword(email);
        setStep(1);
    }

    const changePassword: SubmitHandler<FormValues> = async ({email, code, password, confirmPassword}) => {
        const response = await UserService.changePassword(email, code, password, confirmPassword);
        setStep(0);
        back();
    }

    const fieldErrors = useErrorHandling(errors, error, [errors.email, errors.code, errors.password, errors.confirmPassword]);
    
    return (
        <Modal isOpen={isOpen(MODALS.CHANGE_PASSWORD)}>
            <form className={styles.modal} onSubmit={handleSubmit(fetching)}>
                <Label label='Email'>
                    <Input 
                        icon={<MdOutlineAlternateEmail />}
                        placeholder='example@example.com'
                        {...register('email', {
                            required: 'It\'s required field',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: 'Invalid email',
                            },
                        })}
                    />
                    {fieldErrors?.email &&
                        <ErrorPlate>{fieldErrors.email}</ErrorPlate>
                    }
                </Label>
                {step === 1 &&
                    <>
                        <Label label='Code'>
                            <Input 
                                icon={<FaBarcode />}
                                placeholder='***-***'
                                {...register('code', {
                                    required: 'It\'s required field',
                                })}
                            />
                            {fieldErrors?.code &&
                                <ErrorPlate>{fieldErrors.code}</ErrorPlate>
                            }
                        </Label>
                        <Label label='Password'>
                            <Input 
                                icon={<TbPassword />}
                                placeholder='********'
                                type="password"
                                {...register('password', {
                                    required: 'It\'s required field',
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum characters - 6'
                                    },
                                    maxLength: {
                                        value: 24,
                                        message: 'Maximum characters - 24'
                                    }
                                })}
                            />
                            {fieldErrors?.password &&
                                <ErrorPlate>{fieldErrors.password}</ErrorPlate>
                            }
                        </Label>
                        <Label label='Confirm password'>
                            <Input 
                                icon={<TbPassword />}
                                placeholder='********'
                                type="password"
                                {...register('confirmPassword', {
                                    validate: value => value === getValues('password') || 'Passwords mismatch'
                                })}
                            />
                            {fieldErrors?.confirmPassword &&
                                <ErrorPlate>{fieldErrors.confirmPassword}</ErrorPlate>
                            }
                        </Label>
                    </>
                }
                {fieldErrors?.global &&
                    <ErrorPlate>{fieldErrors.global}</ErrorPlate>
                }
                <Button loading={isLoading}>
                    CHANGE PASSWORD
                </Button>
                <a href="#" onClick={backClickHandler} className={styles.back}>
                    Back
                </a>
            </form>
        </Modal>
    )
}

export default ChangePassword