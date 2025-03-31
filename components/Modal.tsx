"use client";
import React, { useEffect, useRef } from "react";
import ActionButton from "@/components/ActionButton";

type ModalProps = {
  onClose?: () => void;
  onConfirm?: () => void;
  isVisible?: boolean;
  children?: React.ReactNode;
  className?: string;
};

function Modal({ isVisible, onClose, className, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };
    document.addEventListener("keypress", (e) => handleEscape(e));
    return () => document.removeEventListener("keypress", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isVisible, onClose]);

  return (
    <dialog
      ref={modalRef}
      className={`backdrop:bg-black/50 backdrop:backdrop-blur-sm ${
        className ? className : ""
      }`}
    >
      {children}
    </dialog>
  );
}

type DeleteConfirmationModalProps = Omit<ModalProps, "children"> & {
  targetMsg?: { commentId: number; replyId?: number };
};

export function DeleteConfirmationModal({
  targetMsg,
  ...rest
}: DeleteConfirmationModalProps) {
  return (
    <Modal className={"bg-white rounded-lg p-8 max-w-96"} {...rest}>
      <div
        className={"flex flex-col gap-4"}
        onClick={(e) => e.stopPropagation()}
      >
        {targetMsg ? (
          <>
            <h2 className={"font-bold text-lg"}>
              Delete {targetMsg.replyId ? "Reply" : "Comment"}
            </h2>
            <p className={"text-grayish-blue"}>
              Are you sure you want to delete this{" "}
              {targetMsg.replyId ? "reply" : "comment"}? This will remove the{" "}
              {targetMsg.replyId ? "reply" : "comment"} and can&apos;t be
              undone.
            </p>
          </>
        ) : (
          <p className={"text-grayish-blue"}>This dialog should not be open</p>
        )}

        <div className={"flex gap-4 items-center justify-between"}>
          <ActionButton onClick={rest.onClose} action={"cancel"}>
            {targetMsg ? "NO, CANCEL" : "CLOSE"}
          </ActionButton>
          {targetMsg && (
            <ActionButton onClick={rest.onConfirm} action={"confirm"}>
              YES, DELETE
            </ActionButton>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Modal;
