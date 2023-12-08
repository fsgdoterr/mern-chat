import { MODALS, closeAllModals, closeModal, openModal } from "../store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "./redux"


export const useModals = () => {

    const modals = useAppSelector(state => state.modals.modals);
    const dispatch = useAppDispatch();

    const open = (modalName: MODALS) => dispatch(openModal(modalName));
    const isModals = !!modals.length;
    const isOpen = (modalName: MODALS) => modals[modals.length - 1] === modalName;
    const back = () => dispatch(closeModal());
    const closeModals = () => dispatch(closeAllModals());
    const isFirst = modals.length < 2;

    return {
        open,
        isModals,
        isOpen,
        back,
        closeModals,
        isFirst
    }
}