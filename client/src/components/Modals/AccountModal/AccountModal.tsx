import React from 'react'
import styles from './AccountModal.module.scss'
import Modal from '../../UI/Modal/Modal'
import { useModals } from '../../../hooks/useModals'
import { MODALS } from '../../../store/slices/modalSlice'
import { useAccount } from '../../../hooks/useAccount'
import defaultAvatar from '../../../assets/img/default-avatar.png';
import Button from '../../UI/Button/Button'
import Logout from '../../UI/Logout/Logout'

const AccountModal = () => {

    const { isOpen, open, back } = useModals();
    const { avatar, email, name } = useAccount();

    const backClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        back();
    }

    return (
        <Modal isOpen={isOpen(MODALS.ACCOUNT)}>
            <div className={styles.modal}>
                <img 
                    src={avatar || defaultAvatar} 
                    alt=""
                    width={250} 
                    height={250} 
                    className={styles.avatar}
                />
                <div className={styles.data}>
                    <p>Email: {email}</p>
                    <p>Name: {name}</p>
                </div>
                <Button onClick={() => open(MODALS.UPDATE_USER)}>
                    UPDATE USER
                </Button>
                <Button onClick={() => open(MODALS.CHANGE_PASSWORD)}>
                    CHANGE PASSWORD
                </Button>
                <Logout />
                <a href="#" onClick={backClickHandler} className={styles.back}>
                    Back
                </a>
            </div>
        </Modal>
    )
}

export default AccountModal