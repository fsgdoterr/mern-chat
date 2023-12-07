import React from 'react'
import styles from './SignUp.module.scss';
import UnauthorizedCard from '../../components/UnauthorizedCard/UnauthorizedCard'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { useFetching } from '../../hooks/useFetching';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import Label from '../../components/UI/Label/Label';
import Input from '../../components/UI/Input/Input';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import ErrorPlate from '../../components/UI/ErrorPlate/ErrorPlate';
import { TbPassword } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { AuthService } from '../../services/AuthService';
import { setUser } from '../../store/slices/rootSlice';

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const {isLoading, fetching, error} = useFetching<SubmitHandler<FormValues>>(async ({email, password, confirmPassword}) => {
        const response = await AuthService.signup(email, password, confirmPassword);
        dispatch(setUser(response.data));
    });

    const fieldErrors = useErrorHandling(errors, error, [errors.email, errors.password, errors.confirmPassword]);

    return (
        <div className='h-full flex flex-center'>
            <UnauthorizedCard header='Register' onSubmit={handleSubmit(fetching)}>
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
                {fieldErrors?.global &&
                    <ErrorPlate>{fieldErrors.global}</ErrorPlate>
                }
                <Button loading={isLoading}>
                    SIGN UP
                </Button>
                <NavLink to="/signin">
                    Already have an account?
                </NavLink>
            </UnauthorizedCard>
        </div>
    )
}

export default SignUp