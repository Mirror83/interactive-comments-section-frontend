"use client";

import CommentCard from "@/components/CommentCard";
import {comments as allComments, User, Comment} from "@/mock-data/data";
import CommentInput from "@/components/CommentInput";
import {DeleteConfirmationModal} from "@/components/Modal";
import React, {useState} from "react";
import AppContext from "@/context/app-context";

const user: User = {
    "image": {
        "png": "/images/avatars/image-juliusomo.png",
        "webp": "/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
}

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comments, setComments] = useState(allComments);

    /**
     * The piece of state below temporarily stores the commentId and replyId
     * of a comment or a reply (if replyId is not undefined).
     * It is used to let the deletion modal know what message (comment or reply)
     * is the target for deletion.
     */
    const [targetMsg, setTargetMsg] = useState<{ commentId: number, replyId: number | undefined }>();

    function closeDeleteModal() {
        setTargetMsg(undefined);
        setIsModalVisible(false);
    }

    function openDeleteModal(commentId: number, replyId: number | undefined) {
        console.log("Opening Modal...");
        setIsModalVisible(true);
        setTargetMsg({commentId: commentId, replyId});
        console.log({commentId, replyId});
    }

    function onEditComment() {
        console.log("Editing comment...");
    }

    function deleteComment(id: number) {
        setComments(prevComments =>
            prevComments.filter((comment) => comment.id !== id)
        );
    }

    function deleteReply(commentId: number, replyId: number) {
        setComments(prevComments => prevComments.map(comment => {
                if (comment.id === commentId) {
                    console.log(comment.replies)
                    comment.replies = comment.replies.filter((reply) => reply.id !== replyId)
                    return comment
                } else {
                    return comment
                }
            }
        ))
    }

    function onConfirmMsgDeletion(commentId: number, replyId: number | undefined) {
        if (replyId) {
            deleteReply(commentId, replyId);
        } else {
            deleteComment(commentId)
        }
        closeDeleteModal();
    }

    function addComment(content: string) {
        const comment: Comment = {
            user,
            content,
            createdAt: Date(),
            score: 0,
            replies: [],
            id: comments[comments.length - 1].id + 1
        }
        setComments(prevComments => [...prevComments, comment]);
    }

    return (
        <AppContext value={{user: user, openDeleteModal, onEditComment}}>
            <div className={"p-4 flex flex-col h-screen"}>
                <div className={"flex flex-1 flex-col gap-4 overflow-y-scroll"}>
                    {comments.map((comment) => (
                            <CommentCard
                                comment={comment}
                                user={user}
                                key={comment.id}
                            />
                        )
                    )}
                </div>
                <CommentInput user={user} addComment={addComment}/>
                <DeleteConfirmationModal isVisible={isModalVisible}
                                         onClose={closeDeleteModal}
                                         onConfirm={() =>
                                             onConfirmMsgDeletion(targetMsg!.commentId, targetMsg!.replyId)}/>
            </div>
        </AppContext>

    );
}
