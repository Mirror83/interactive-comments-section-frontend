import React, {useContext, useState} from 'react';
import Image from "next/image";
import type {Comment, Reply, User} from "@/mock-data/data"
import IconButton from "@/components/IconButton";
import AppContext, {VoteType} from "@/context/app-context";
import ReplyInput from "@/components/ReplyInput";


type CommentCardProps = {
    user: User,
    comment: Comment;
    onDelete?: () => void;
}

function CommentCard({user, comment, onDelete}: CommentCardProps) {
    const [replyInputIsVisible, setReplyInputIsVisible] = useState(false)
    const {addReply} = useContext(AppContext)


    return (
        <div>
            <div className={"bg-white p-4 rounded-xl"}>
                <Header author={comment.user}/>
                <Content content={comment.content}/>
                <Footer commentId={comment.id} author={comment.user} score={comment.score}
                        toggleReplyInputVisibility={() => setReplyInputIsVisible(prev => !prev)}/>
            </div>
            <ReplyInput isVisible={replyInputIsVisible} replyingTo={comment.user} user={user} commentId={comment.id}
                        addReply={(content, commentId) => {
                            addReply(content, commentId)
                            setReplyInputIsVisible(false)
                        }
                        }/>

            <div className={"border-l-4 border-light-gray ps-4"}>
                {comment.replies.map(reply => (
                        <ReplyCard key={reply.id} commentId={comment.id} reply={reply} onDelete={onDelete}/>
                    )
                )}
            </div>
        </div>
    );
}

type HeaderProps = {
    author: User
}

function Header({author}: HeaderProps) {
    const {user} = useContext(AppContext);

    return <div className={"flex items-center gap-4"}>
        <Image
            src={author.image.png}
            alt={`${author.username} profile`}
            width={40}
            height={40}/>
        <span className={"font-bold"}>{author.username}</span>
        {user?.username == author.username &&
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
    commentId: number,
    replyId?: number,
    author: User,
    score: number,
    onDelete?: () => void,
    toggleReplyInputVisibility: () => void,
}

function Footer({commentId, replyId, author, score, toggleReplyInputVisibility}: FooterProps) {
    const {user, openDeleteModal, onEditComment, voteMessage} = useContext(AppContext)

    return <div className={"flex justify-between items-center"}>
        <div className={"flex bg-light-gray items-center gap-4 rounded-lg py-2 px-4"}>
            <button onClick={() => voteMessage(commentId, replyId, VoteType.DOWN_VOTE)}>
                <Image src={"/images/icon-minus.svg"} alt={"down-vote"} height={10} width={10}/>
            </button>
            <span className={"text-moderate-blue font-[500]"}>{score}</span>
            <button onClick={() => voteMessage(commentId, replyId, VoteType.UP_VOTE)}>
                <Image src={"/images/icon-plus.svg"} alt={"up-vote"} height={10} width={10}/>
            </button>
        </div>
        {user?.username == author.username ? (
            <div className={"flex gap-4"}>
                <IconButton label={"Delete"} iconPath={"/images/icon-delete.svg"}
                            labelClassName={"text-soft-red"}
                            onClick={() => openDeleteModal(commentId, replyId)}/>
                <IconButton label={"Edit"} iconPath={"/images/icon-edit.svg"}
                            labelClassName={"text-moderate-blue"}
                            onClick={() => onEditComment(commentId)}
                />
            </div>
        ) : (
            <IconButton
                label={"Reply"}
                iconPath={"/images/icon-reply.svg"}
                labelClassName={"text-moderate-blue"}
                onClick={toggleReplyInputVisibility}
            />
        )}
    </div>
}

type ReplyCardProps = {
    commentId: number,
    reply: Reply,
    onDelete?: () => void
}

function ReplyCard({commentId, reply, onDelete}: ReplyCardProps) {
    const [replyInputIsVisible, setReplyInputIsVisible] = useState(false)
    const {user, addReply} = useContext(AppContext)

    return <div>
        <div className={"bg-white p-4 rounded-xl my-4"}>
            <Header author={reply.user}/>
            <Content content={reply.content} replyingTo={reply.replyingTo}/>
            <Footer commentId={commentId} replyId={reply.id}
                    author={reply.user} score={reply.score}
                    onDelete={onDelete}
                    toggleReplyInputVisibility={() => setReplyInputIsVisible(prev => !prev)}/>
        </div>
        <ReplyInput isVisible={replyInputIsVisible} replyingTo={reply.user}
                    user={user!} commentId={commentId}
                    addReply={(content, commentId) => {
                        addReply(content, commentId)
                        setReplyInputIsVisible(false)
                    }
                    }/>
    </div>
}

export default CommentCard;