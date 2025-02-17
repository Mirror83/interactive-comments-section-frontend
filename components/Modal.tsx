"use client";
import React, {useEffect, useRef} from 'react';
import ActionButton from "@/components/ActionButton";

type ModalProps = {
    onClose?: () => void;
    onConfirm?: () => void;
    isVisible?: boolean;
    children?: React.ReactNode;
}

function Modal({isVisible, onClose, children}: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);


    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (onClose) onClose()
            }
        }
        document.addEventListener("keypress", (e) => handleEscape(e));
        return document.removeEventListener("keypress", handleEscape);
    }, [onClose]);

    useEffect(() => {
        if (isVisible) {
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        }

    }, [isVisible, onClose]);

    return (
        <dialog ref={modalRef} className={"backdrop:bg-black/50 backdrop:backdrop-blur-sm"}>
            {children}
        </dialog>
    );
}

export function DeleteConfirmationModal(props: Omit<ModalProps, "children">) {
    return <Modal {...props}>
        <div className={"flex flex-col h-full items-center justify-center px-4 rounded-lg"}>
            <div className={"bg-white rounded-xl flex flex-col gap-4 p-8"}
                 onClick={e => e.stopPropagation()}>
                <h2 className={"font-bold text-lg"}>Delete Comment</h2>
                <p className={"text-grayish-blue"}>
                    Are you sure you want to delete this comment?
                    This will remove the comment and can&apos;t be undone.
                </p>
                <div className={"flex gap-4 items-center justify-between"}>
                    <ActionButton onClick={props.onClose} action={"cancel"}>NO, CANCEL</ActionButton>
                    <ActionButton onClick={props.onConfirm} action={"confirm"}>YES, DELETE</ActionButton>
                </div>
            </div>
        </div>
    </Modal>
}

export default Modal;