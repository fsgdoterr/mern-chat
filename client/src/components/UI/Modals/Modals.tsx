import React, { FC, PropsWithChildren } from 'react'
import styles from './Modals.module.scss';
import { useModals } from '../../../hooks/useModals';
import { CSSTransition } from 'react-transition-group';

interface ModalsProps {}

const Modals: FC<PropsWithChildren<ModalsProps>> = ({
    children
}) => {

    const { isModals, back } = useModals();

    return (
        <CSSTransition
            in={isModals}
            timeout={400}
            classNames={{
                enterActive: styles.enterActive,
                enterDone: styles.enterDone,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            mountOnEnter
            unmountOnExit
        >
            <div 
                className={styles.modals}
                onMouseDown={back}
            >
                {children}
            </div>
        </CSSTransition>
    )
}

export default Modals