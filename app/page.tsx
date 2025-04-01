"use client";

import CommentInput from "@/components/CommentInput";
import MessageCard from "@/components/MessageCard";
import { DeleteConfirmationModal } from "@/components/Modal";
import {
  CommentContext,
  CommentDispatchContext,
  commentReducer,
} from "@/context/app-context";
import { User, comments } from "@/mock-data/data";
import { useReducer, useState } from "react";

const user: User = {
  image: {
    png: "/images/avatars/image-juliusomo.png",
    webp: "/images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [state, dispatch] = useReducer(commentReducer, comments);

  /**
   * The piece of state below temporarily stores the commentId and replyId
   * of a comment or a reply (if replyId is not undefined).
   * It is used to let the deletion modal know what message (comment or reply)
   * is the target for deletion.
   */
  const [targetMsg, setTargetMsg] = useState<{
    commentId: number;
    replyId?: number;
  }>();

  function closeDeleteModal() {
    setTargetMsg(undefined);
    setIsModalVisible(false);
  }

  function openDeleteModal(commentId: number, replyId?: number) {
    setIsModalVisible(true);
    setTargetMsg({ commentId: commentId, replyId });
    console.log({ commentId, replyId });
  }

  function onConfirmMsgDeletion(commentId: number, replyId?: number) {
    if (replyId) {
      dispatch({
        type: "delete_reply",
        payload: {
          commentId,
          replyId,
        },
      });
    } else {
      dispatch({
        type: "delete_comment",
        payload: {
          commentId,
        },
      });
    }
    closeDeleteModal();
  }

  return (
    <CommentContext
      value={{
        user: user,
        state,
        openDeleteModal,
      }}
    >
      <CommentDispatchContext value={{ dispatch }}>
        <div className={"p-4 flex flex-col h-screen items-center"}>
          <div className={"md:w-9/12"}>
            <div className={"flex flex-1 flex-col gap-4 overflow-y-scroll"}>
              {state.map((comment) => (
                <MessageCard comment={comment} key={comment.id} />
              ))}
            </div>
            <CommentInput />
          </div>
          <DeleteConfirmationModal
            targetMsg={targetMsg}
            isVisible={isModalVisible}
            onClose={closeDeleteModal}
            onConfirm={() =>
              onConfirmMsgDeletion(targetMsg!.commentId, targetMsg!.replyId)
            }
          />
        </div>
      </CommentDispatchContext>
    </CommentContext>
  );
}
