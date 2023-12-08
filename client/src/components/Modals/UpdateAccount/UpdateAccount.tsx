import React, { useState, useEffect, useRef, useMemo } from 'react'
import styles from './UpdateAccount.module.scss';
import Modal from '../../UI/Modal/Modal';
import { MODALS } from '../../../store/slices/modalSlice';
import { useModals } from '../../../hooks/useModals';
import Button from '../../UI/Button/Button';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import defaultAvatar from '../../../assets/img/default-avatar.png';
import { useAccount } from '../../../hooks/useAccount';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetching } from '../../../hooks/useFetching';
import { useUploadFile } from '../../../hooks/useUploadFile';
import Avatar from './Avatar/Avatar';
import UpdateField from '../../UI/UpdateField/UpdateField';
import Label from '../../UI/Label/Label';
import UserService from '../../../services/UserService';
import { useAppDispatch } from '../../../hooks/redux';
import { setUser } from '../../../store/slices/rootSlice';
import { useIsAuth } from '../../../hooks/useIsAuth';

export interface UpdateAccountFormValues {
    email: string;
    name: string;
    removeAvatar: boolean;
    avatar: FileList | null;
}

const UpdateAccount = () => {

    const { isOpen, back } = useModals();
    const { email, name } = useAccount();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
    } = useForm<UpdateAccountFormValues>();

    watch();

    const close = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        back();
    }

    const {isLoading, fetching, error} = useFetching<SubmitHandler<UpdateAccountFormValues>>(async ({avatar, email, name, removeAvatar}) => {
        const formData = new FormData();

        if(removeAvatar) formData.append('removeAvatar', 'true');
        else if(avatar && avatar.length) formData.append('avatar', avatar[0]);
        if(name) formData.append('name', name);
        if(email) formData.append('email', email);

        const response = await UserService.update(formData);
        dispatch(setUser(response.data));
        setValue('name', '');
        setValue('email', '');
        setValue('removeAvatar', false);
        setValue('avatar', null);
        back();
    });

    const buttonDisabled = useMemo(() => {
        const avatar = getValues('avatar');
        const removeAvatar = getValues('removeAvatar');
        const formEmail = getValues('email');
        const formName = getValues('name');
        const regex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;

        if((!avatar || !avatar.length) && !removeAvatar && !formEmail && !formName) return true;
        if(formEmail && (formEmail.toLocaleLowerCase() === email.toLocaleLowerCase() || !regex.test(formEmail))) return true;
        if(formName === name) return true;

        return false;
    }, [error, getValues('email'), getValues('name'), getValues('removeAvatar'), getValues('avatar')]);

    return (
        <Modal isOpen={isOpen(MODALS.UPDATE_USER)}>
            <form 
                className={styles.modal}
                onSubmit={handleSubmit(fetching)}
            >
                <Avatar 
                    register={register('avatar')}
                    setValue={setValue}
                    getValues={getValues}
                />
                <Label label='Email' preventDefault>
                    <UpdateField 
                        initialValue={email}
                        inputProps={register('email')}
                        noteditCllbck={() => setValue('email', '')}
                    />
                </Label>
                <Label label='Name' preventDefault>
                    <UpdateField 
                        initialValue={name}
                        inputProps={register('name')}
                        noteditCllbck={() => setValue('name', '')}
                    />
                </Label>
                <Button
                    loading={isLoading}
                    disabled={buttonDisabled}
                >
                    SAVE
                </Button>
                <a href="#" className={styles.back} onClick={close}>
                    Back
                </a>
            </form>
        </Modal>
    )
}

export default UpdateAccount