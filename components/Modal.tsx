"use client";
import React from 'react';
import ActionButton from "@/components/ActionButton";

type ModalProps = {
    onClose?: () => void;
    onConfirm?: () => void;
    isVisible?: boolean;
    children?: React.ReactNode;
}

function Modal({isVisible, onClose, children}: ModalProps) {
    return (
        <div className={`${isVisible ? "block" : "hidden"} z-10 absolute left-0 top-0 w-full h-screen bg-black/75`}
             onClick={onClose}>
            <div className={"z-20 h-full w-full"}>
                {children}
            </div>
        </div>
    );
}

export function DeleteConfirmationModal(props: Omit<ModalProps, "children">) {
    return <Modal {...props}>
        <div className={"flex flex-col h-full items-center justify-center px-4"}>
            <div className={"bg-white rounded-xl flex flex-col gap-4 p-8"}
                 onClick={e => e.stopPropagation()}>
                <h2 className={"font-bold text-lg"}>Delete Comment</h2>
                <p className={"text-grayish-blue"}>
                    Are you sure you want to delete this comment?
                    This will remove the comment and can&apos;t be undone.
                </p>
                <div className={"flex items-center justify-between"}>
                    <ActionButton onClick={props.onClose} action={"cancel"}>NO, CANCEL</ActionButton>
                    <ActionButton onClick={props.onConfirm} action={"confirm"}>YES, DELETE</ActionButton>
                </div>
            </div>
        </div>
    </Modal>
}

export default Modal;