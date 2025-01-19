import React from 'react';
import Image from "next/image";
import type {Comment, User} from "@/mock-data/data"


type CommentCardProps = {
    user: User,
    comment: Comment;
}

function CommentCard({user, comment}: CommentCardProps) {
    return (
        <div className={"bg-white p-4 rounded-xl"}>
            <div className={"flex items-center gap-6"}>
                <Image
                    src={comment.user.image.png}
                    alt={`${comment.user.username} profile`}
                    width={40}
                    height={40}/>
                {user.username == comment.user.username &&
                    <span className={"p-2 bg-moderate-blue text-white"}>You</span>}
                <span className={"font-bold"}>{comment.user.username}</span>
                <span className={"text-grayish-blue font-light"}>1 month ago</span>
            </div>
            <div className={"py-4 text-grayish-blue"}>{comment.content}</div>
            <div className={"flex justify-between items-center"}>
                <div className={"flex bg-light-gray items-center gap-4 rounded-lg py-2 px-4"}>
                    <button>
                        <Image src={"/images/icon-minus.svg"} alt={"down-vote"} height={10} width={10}/>
                    </button>
                    <span className={"text-moderate-blue font-[500]"}>{comment.score}</span>
                    <button>
                        <Image src={"/images/icon-plus.svg"} alt={"up-vote"} height={10} width={10}/>
                    </button>
                </div>
                <div className={"flex items-baseline gap-2"}>
                    <Image src={"/images/icon-reply.svg"} alt={""} height={10} width={10}/>
                    <span className={"text-moderate-blue font-[500]"}>Reply</span>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;