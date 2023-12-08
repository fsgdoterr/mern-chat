import React, { FC, useMemo, useState } from 'react'
import styles from './Avatar.module.scss';
import { useAccount } from '../../../../hooks/useAccount';
import { useUploadFile } from '../../../../hooks/useUploadFile';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import defaultAvatar from '../../../../assets/img/default-avatar.png';
import { UseFormGetValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { UpdateAccountFormValues } from '../UpdateAccount';
import { IMAGE_MIMETYPES } from '../../../../utils/const';
import { IoMdArrowRoundBack } from "react-icons/io";

interface AvatarProps {
    register: UseFormRegisterReturn<"avatar">
    setValue: UseFormSetValue<UpdateAccountFormValues>,
    getValues: UseFormGetValues<UpdateAccountFormValues>
}

const Avatar: FC<AvatarProps> = ({
    register: {ref, ...registerRest},
    setValue,
    getValues,
}) => {

    const { avatar } = useAccount();
    const [uploadedAvatar, setUploadedAvatar] = useState<string>('');

    const inputFileRef = useUploadFile((e) => {
        setUploadedAvatar(e.target!.result as string);
        setValue('removeAvatar', false);
    }, {
        maxSize: 10 * 1024 * 1024,
        allowedMimetypes: [
            IMAGE_MIMETYPES.IMAGE_JPEG,
            IMAGE_MIMETYPES.IMAGE_PNG,
            IMAGE_MIMETYPES.IMAGE_WEBP,
        ],
    }, () => {
        setValue('avatar', null);
    });

    const showedAvatar = useMemo(() => {
        if(uploadedAvatar) return uploadedAvatar;
        else if(getValues('removeAvatar')) return defaultAvatar;
        else if(avatar) return avatar;
        else return defaultAvatar;
    }, [uploadedAvatar, getValues('avatar'), getValues('removeAvatar')]);

    const remove = () => {
        if(uploadedAvatar) {
            setValue('avatar', {length: 0} as FileList);
            return setUploadedAvatar('');
        }
        if(avatar && !getValues('removeAvatar')) {
            return setValue('removeAvatar', true);
        }
        if(avatar && getValues('removeAvatar')) {
            return setValue('removeAvatar', false);
        }
    }

    return (
        <div className={styles.avatar}>
            <input 
                type="file"
                className={styles.fileInput}
                {...registerRest}
                ref={(input) => {
                    ref(input);
                    inputFileRef.current = input;
                }}
            />
            <div className={styles.avatarHeader}>
                <div 
                    className={styles.changeAvatar}
                    onClick={() => inputFileRef.current?.click()}
                >
                    <FaPencilAlt />
                </div>
                {(avatar || uploadedAvatar) &&
                    <div 
                        className={styles.removeAvatar}
                        onClick={remove}
                    >
                        {uploadedAvatar
                            ? <FaTrash />
                            : getValues('removeAvatar')
                            ? <IoMdArrowRoundBack />
                            : <FaTrash />
                        }
                    </div>
                }
            </div>
            <img 
                src={showedAvatar} 
                width={250}
                height={250}
                alt=""
            />
        </div>
    )
}

export default Avatar