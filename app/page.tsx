"use client";

import CommentCard from "@/components/CommentCard";
import {comments, User} from "@/mock-data/data";
import CommentInput from "@/components/CommentInput";
import {DeleteConfirmationModal} from "@/components/Modal";
import React, {useState} from "react";

const user: User = {
    "image": {
        "png": "/images/avatars/image-juliusomo.png",
        "webp": "/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
}

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    function closeModal() {
        setIsModalVisible(false);
    }

    function openModal() {
        console.log("Opening Modal...");
        setIsModalVisible(true);
    }

    return (
        <div className={"p-4 flex flex-col h-screen"}>
            <div className={"flex flex-1 flex-col gap-4 overflow-y-scroll"}>
                {comments.map((comment) => (
                        <CommentCard comment={comment} user={user} key={comment.id} onDelete={openModal}/>
                    )
                )}
            </div>
            <CommentInput user={user}/>
            <DeleteConfirmationModal isVisible={isModalVisible} onClose={closeModal} onConfirm={closeModal}/>
        </div>
    );
}
