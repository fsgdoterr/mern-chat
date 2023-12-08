import React, { FC, PropsWithChildren, useState, useRef, useEffect } from 'react'
import styles from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useModals } from '../../../hooks/useModals';

interface ModalProps {
    isOpen: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
    children,
    isOpen,
}) => {

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const openedRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if(openedRef.current) 
            clearTimeout(openedRef.current);

        if(isOpen) {
            openedRef.current= setTimeout(() => {
                setIsOpened(true);
            }, 200)    
        } else {
            setIsOpened(false);
        }
        return () => {
            if(openedRef.current) 
                clearTimeout(openedRef.current);
        }
    }, [isOpen])

    return (
        <CSSTransition
            in={isOpened}
            timeout={200}
            classNames={{
                enterActive: styles.enterActive,
                enterDone: styles.enterDone,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            unmountOnExit
            mountOnEnter
        >
            <div 
                className={styles.modal}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </CSSTransition>
    )
}

export default Modal