"use client";

import CommentCard from "@/components/CommentCard";
import {comments, User} from "@/mock-data/data";
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

    function closeDeleteModal() {
        setIsModalVisible(false);
    }

    function openDeleteModal() {
        console.log("Opening Modal...");
        setIsModalVisible(true);
    }

    function onEditComment() {
        console.log("Editing comment...");
    }

    return (
        <AppContext.Provider value={{user: user, openDeleteModal, onEdit: onEditComment}}>
            <div className={"p-4 flex flex-col h-screen"}>
                <div className={"flex flex-1 flex-col gap-4 overflow-y-scroll"}>
                    {comments.map((comment) => (
                            <CommentCard comment={comment} user={user} key={comment.id} onDelete={openDeleteModal}/>
                        )
                    )}
                </div>
                <CommentInput user={user}/>
                <DeleteConfirmationModal isVisible={isModalVisible} onClose={closeDeleteModal}
                                         onConfirm={closeDeleteModal}/>
            </div>
        </AppContext.Provider>

    );
}
