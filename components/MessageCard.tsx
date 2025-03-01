import React, {useContext, useState} from 'react';
import Image from "next/image";
import type {Comment, Reply, User} from "@/mock-data/data"
import IconButton from "@/components/IconButton";
import AppContext from "@/context/app-context";
import ReplyInput from "@/components/ReplyInput";
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import ScoreWidget from "@/components/ScoreWidget"

type MessageCardProps = {
    user: User,
    comment: Comment;
    reply?: Reply,
    className?: string;
}

function MessageCard({user, comment, reply, className}: MessageCardProps) {
    const [replyInputIsVisible, setReplyInputIsVisible] = useState(false)
    const {addReply, onEditComment, onEditReply, openDeleteModal} = useContext(AppContext)
    const [isEditing, setIsEditing] = useState(false)

    const editor = useEditor({
        extensions: [StarterKit],
        content: reply ? reply.content : comment.content,
        editorProps: {
            attributes: {
                class: "border border-grayish-blue p-2 rounded-lg outline-none h-24 overflow-y-scroll my-4",
            },
        },
        immediatelyRender: false
    })

    function toggleReplyInputVisibility() {
        setReplyInputIsVisible(prev => !prev)
    }

    function onUpdateMessage() {
        if (!editor?.getText()) {
            return
        }
        if (!reply) {
            onEditComment(editor.getText(), comment.id)
        } else {
            onEditReply(editor.getText(), comment.id, reply.id)
        }
        setIsEditing(false)
    }

    function canUpdateMessage() {
        return isEditing && (editor !== null && editor.getText().length > 0)
    }

    function toggleIsEditing() {
        setIsEditing(prev => !prev)
    }

    return (
        <div className={`${className ?? ""}`}>
            <div className={"flex items-center gap-4 bg-white p-4 rounded-xl"}>
                <ScoreWidget score={reply ? reply.score : comment.score} commentId={comment.id} replyId={reply?.id}
                             className={"w-12 flex-grow-0 flex-shrink-0 flex-col items-center rounded-xl max-h-max hidden sm:flex"}/>
                <div className={"w-full"}>
                    <Header author={reply ? reply.user : comment.user}
                            toggleReplyInputVisibility={toggleReplyInputVisibility}
                            isEditing={isEditing}
                            toggleIsEditing={toggleIsEditing}
                            onDelete={() => openDeleteModal(comment.id, reply?.id)}
                    />
                    {isEditing ? (
                        <div className={"flex gap-4 items-start"}>
                            <EditorContent editor={editor} className={"flex-1"}/>
                            <button
                                className={"hidden sm:block mt-4 px-4 py-2 bg-moderate-blue  text-white rounded-lg disabled:bg-grayish-blue"}
                                onClick={onUpdateMessage}
                                disabled={!canUpdateMessage()}>Update
                            </button>
                        </div>
                    ) : <Content content={reply ? reply.content : comment.content}
                                 replyingTo={reply?.replyingTo}/>}
                    <Footer commentId={comment.id}
                            replyId={reply?.id}
                            author={reply ? reply.user : comment.user}
                            score={reply ? reply.score : comment.score}
                            toggleReplyInputVisibility={toggleReplyInputVisibility}
                            isEditing={isEditing}
                            onUpdate={onUpdateMessage}
                            canUpdate={canUpdateMessage()}
                            toggleIsEditing={toggleIsEditing}
                            className={"sm:hidden"}
                    />
                </div>
            </div>
            <ReplyInput isVisible={replyInputIsVisible} replyingTo={reply ? reply.user : comment.user} user={user}
                        commentId={comment.id}
                        addReply={(content, commentId) => {
                            addReply(content, commentId)
                            setReplyInputIsVisible(false)
                        }
                        }/>
            {!reply && (
                <div className={"border-l-4 border-light-gray ps-4"}>
                    {comment.replies.map(reply => (
                            <ReplyCard key={reply.id} comment={comment} reply={reply} className={"my-4"}/>
                        )
                    )}
                </div>
            )
            }
        </div>
    );
}

type HeaderProps = {
    author: User,
    isEditing: boolean,
    toggleReplyInputVisibility: () => void,
    toggleIsEditing?: () => void,
    onDelete?: () => void,
}

function Header({author, toggleIsEditing, toggleReplyInputVisibility, onDelete}: HeaderProps) {
    const {user} = useContext(AppContext);

    return <div className={"flex items-center justify-between w-full"}>
        <div className={"flex items-center gap-4"}>
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
        <div className={"hidden sm:block"}>
            {user?.username == author.username ?
                (<div className={"flex gap-4"}>
                        <IconButton label={"Delete"} iconPath={"/images/icon-delete.svg"}
                                    height={14} width={12}
                                    labelClassName={"text-soft-red"}
                                    onClick={onDelete}/>
                        <IconButton label={"Edit"} iconPath={"/images/icon-edit.svg"}
                                    height={14} width={14}
                                    labelClassName={"text-moderate-blue"}
                                    onClick={toggleIsEditing}
                        />
                    </div>
                ) : (
                    <IconButton
                        label={"Reply"}
                        iconPath={"/images/icon-reply.svg"}
                        height={13} width={14}
                        labelClassName={"text-moderate-blue"}
                        onClick={toggleReplyInputVisibility}
                    />
                )}
        </div>
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
    isEditing: boolean,
    canUpdate: boolean,
    toggleReplyInputVisibility: () => void,
    onUpdate: () => void,
    toggleIsEditing?: () => void,
    onDelete?: () => void,
    className?: string,
}

function Footer({
                    commentId,
                    replyId,
                    author,
                    score,
                    canUpdate,
                    onUpdate,
                    isEditing,
                    toggleReplyInputVisibility,
                    toggleIsEditing,
                    className,
                }: FooterProps) {
    const {user, openDeleteModal} = useContext(AppContext)

    return <div className={`flex justify-between items-center ${className ?? ""}`}>
        <ScoreWidget score={score} commentId={commentId} replyId={replyId}/>
        {user?.username == author.username ? isEditing ?
            (
                <button className={"bg-moderate-blue  text-white rounded-lg disabled:bg-grayish-blue"}
                        onClick={onUpdate}
                        disabled={!canUpdate}>
                    <div className={"py-2 px-8"}>UPDATE</div>
                </button>
            ) : (
                <div className={"flex gap-4"}>
                    <IconButton label={"Delete"} iconPath={"/images/icon-delete.svg"}
                                height={14} width={12}
                                labelClassName={"text-soft-red"}
                                onClick={() => openDeleteModal(commentId, replyId)}/>
                    <IconButton label={"Edit"} iconPath={"/images/icon-edit.svg"}
                                height={14} width={14}
                                labelClassName={"text-moderate-blue"}
                                onClick={toggleIsEditing}
                    />
                </div>
            ) : (
            <IconButton
                label={"Reply"}
                iconPath={"/images/icon-reply.svg"}
                height={13} width={14}
                labelClassName={"text-moderate-blue"}
                onClick={toggleReplyInputVisibility}
            />
        )}
    </div>
}

type ReplyCardProps = {
    comment: Comment,
    reply: Reply,
    className?: string
}

function ReplyCard({comment, reply, className}: ReplyCardProps) {
    const {user} = useContext(AppContext)

    return <MessageCard user={user!} comment={comment} reply={reply} className={className}/>
}

export default MessageCard;