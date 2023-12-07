import React from 'react';
import styles from './SignIn.module.scss';
import Input from '../../components/UI/Input/Input';
import UnauthorizedCard from '../../components/UnauthorizedCard/UnauthorizedCard';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import Button from '../../components/UI/Button/Button';
import { NavLink } from 'react-router-dom';
import Label from '../../components/UI/Label/Label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetching } from '../../hooks/useFetching';
import { AuthService } from '../../services/AuthService';
import ErrorPlate from '../../components/UI/ErrorPlate/ErrorPlate';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/slices/rootSlice';
import { useErrorHandling } from '../../hooks/useErrorHandling';

interface FormValues {
    email: string;
    password: string;
}

const SignIn = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const {isLoading, fetching, error} = useFetching<SubmitHandler<FormValues>>(async ({email, password}) => {
        const response = await AuthService.signin(email, password);
        dispatch(setUser(response.data));
    });

    const fieldErrors = useErrorHandling(errors, error, [errors.email, errors.password]);

    return (
        <div className='h-full flex flex-center'>
            <UnauthorizedCard header='Authorization' onSubmit={handleSubmit(fetching)}>
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
                <NavLink to="/forgot" className={styles.forgot}>
                    Forgot password?
                </NavLink>
                {fieldErrors?.global &&
                    <ErrorPlate>{fieldErrors.global}</ErrorPlate>
                }
                <Button loading={isLoading}>
                    SIGN IN
                </Button>
                <NavLink to="/signup">
                    Don't have an account?
                </NavLink>
            </UnauthorizedCard>
        </div>
    )
}

export default SignIn