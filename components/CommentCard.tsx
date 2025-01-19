import React from 'react';
import Image from "next/image";
import type {Comment, Reply, User} from "@/mock-data/data"


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
    return <div className={"flex items-center gap-6"}>
        <Image
            src={author.image.png}
            alt={`${author.username} profile`}
            width={40}
            height={40}/>
        {user.username == author.username &&
            <span className={"p-2 bg-moderate-blue text-white"}>You</span>}
        <span className={"font-bold"}>{author.username}</span>
        <span className={"text-grayish-blue font-light"}>1 month ago</span>
    </div>
}

type ContentProps = {
    content: string
}

function Content({content}: ContentProps) {
    return <div className={"py-4 text-grayish-blue"}>{content}</div>
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
            <div>
                <button>
                    <Image src={"/images/icon-delete.svg"} alt={""} height={10} width={10}/>
                    <span>Delete</span>
                </button>
                <button>
                    <Image src={"/images/icon-delete.svg"} alt={""} height={10} width={10}/>
                    <span>Delete</span>
                </button>
            </div>
        ) : (
            <div className={"flex items-baseline gap-2"}>
                <Image src={"/images/icon-reply.svg"} alt={""} height={10} width={10}/>
                <span className={"text-moderate-blue font-[500]"}>Reply</span>
            </div>
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
        <Content content={reply.content}/>
        <Footer user={user} author={reply.user} score={reply.score}/>
    </div>
}

export default CommentCard;