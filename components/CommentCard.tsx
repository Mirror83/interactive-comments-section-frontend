import React from 'react';
import Image from "next/image";
import type {Comment, Reply, User} from "@/mock-data/data"
import IconButton from "@/components/IconButton";


type CommentCardProps = {
    user: User,
    comment: Comment;
}

function CommentCard({user, comment}: CommentCardProps) {
    return (
        <div>
            <div className={"bg-white p-4 rounded-xl"}>
                <Header user={user} author={comment.user}/>
                <Content content={comment.content}/>
                <Footer user={user} author={comment.user} score={comment.score}/>
            </div>
            <div className={"border-l-4 border-light-gray ps-4"}>
                {comment.replies.map(reply => (
                    <ReplyCard key={reply.id} user={user} reply={reply}/>
                ))}
            </div>
        </div>
    );
}

type HeaderProps = {
    user: User,
    author: User
}

function Header({user, author}: HeaderProps) {
    return <div className={"flex items-center gap-4"}>
        <Image
            src={author.image.png}
            alt={`${author.username} profile`}
            width={40}
            height={40}/>
        <span className={"font-bold"}>{author.username}</span>
        {user.username == author.username &&
            <span className={"py-1 px-2 text-sm bg-moderate-blue rounded text-white font-[500]"}>you</span>}
        <span className={"text-grayish-blue font-light"}>1 month ago</span>
    </div>
}

type ContentProps = {
    content: string
    // The username of the user being replied to
    replyingTo?: string
}

function Content({content, replyingTo}: ContentProps) {
    return <div className={"py-4 text-grayish-blue"}>
        {replyingTo && <span className={"text-moderate-blue font-[500]"}>@{replyingTo}</span>}
        <span>&nbsp;{content}</span>
    </div>
}

type FooterProps = {
    user: User,
    author: User,
    score: number
}

function Footer({user, author, score}: FooterProps) {
    return <div className={"flex justify-between items-center"}>
        <div className={"flex bg-light-gray items-center gap-4 rounded-lg py-2 px-4"}>
            <button>
                <Image src={"/images/icon-minus.svg"} alt={"down-vote"} height={10} width={10}/>
            </button>
            <span className={"text-moderate-blue font-[500]"}>{score}</span>
            <button>
                <Image src={"/images/icon-plus.svg"} alt={"up-vote"} height={10} width={10}/>
            </button>
        </div>
        {user.username == author.username ? (
            <div className={"flex gap-4"}>
                <IconButton label={"Delete"} iconPath={"/images/icon-delete.svg"}
                            labelClassName={"text-soft-red"}/>
                <IconButton label={"Edit"} iconPath={"/images/icon-edit.svg"} labelClassName={"text-moderate-blue"}/>
            </div>
        ) : (
            <IconButton
                label={"Reply"}
                iconPath={"/images/icon-reply.svg"}
                labelClassName={"text-moderate-blue"}/>
        )}
    </div>
}

type ReplyCardProps = {
    user: User,
    reply: Reply,
}

function ReplyCard({user, reply}: ReplyCardProps) {
    return <div className={"bg-white p-4 rounded-xl my-4"}>
        <Header user={user} author={reply.user}/>
        <Content content={reply.content} replyingTo={reply.replyingTo}/>
        <Footer user={user} author={reply.user} score={reply.score}/>
    </div>
}

export default CommentCard;