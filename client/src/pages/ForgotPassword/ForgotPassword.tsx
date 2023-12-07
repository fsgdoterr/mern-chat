import React,{ useState } from 'react'
import UnauthorizedCard from '../../components/UnauthorizedCard/UnauthorizedCard';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { useFetching } from '../../hooks/useFetching';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import Label from '../../components/UI/Label/Label';
import Input from '../../components/UI/Input/Input';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import Button from '../../components/UI/Button/Button';
import { NavLink } from 'react-router-dom';
import ErrorPlate from '../../components/UI/ErrorPlate/ErrorPlate';
import { FaBarcode } from "react-icons/fa6";
import { TbPassword } from 'react-icons/tb';
import UserService from '../../services/UserService';
import { setUser } from '../../store/slices/rootSlice';

interface FormValues {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}

const ForgotPassword = () => {
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
        dispatch(setUser(response.data));
    }

    const fieldErrors = useErrorHandling(errors, error, [errors.email, errors.code, errors.password, errors.confirmPassword]);

    return (
        <div className='h-full flex flex-center'>
            <UnauthorizedCard header='Forgot password?' onSubmit={handleSubmit(fetching)}>
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
                    SIGN UP
                </Button>
                <NavLink to="/signin">
                    Back
                </NavLink>
            </UnauthorizedCard>
        </div>
    )
}

export default ForgotPassword