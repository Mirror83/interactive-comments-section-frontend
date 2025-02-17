import React, {useContext, useState} from 'react';
import Image from "next/image";
import type {Comment, Reply, User} from "@/mock-data/data"
import IconButton from "@/components/IconButton";
import AppContext from "@/context/app-context";
import ReplyInput from "@/components/ReplyInput";
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import ScoreWidget from "@/components/ScoreWidget"

type CommentCardProps = {
    user: User,
    comment: Comment;
    onDelete?: () => void;
}

function CommentCard({user, comment, onDelete}: CommentCardProps) {
    const [replyInputIsVisible, setReplyInputIsVisible] = useState(false)
    const {addReply, onEditComment} = useContext(AppContext)
    const [isEditing, setIsEditing] = useState(false)

    const editor = useEditor({
        extensions: [StarterKit],
        content: comment.content,
        editorProps: {
            attributes: {
                class: "border border-grayish-blue p-2 rounded-lg outline-none h-24 overflow-y-scroll my-4",
            },
        },
        immediatelyRender: false
    })

    return (
        <div>
            <div className={"bg-white p-4 rounded-xl"}>
                <Header author={comment.user}/>
                {isEditing ? (
                    <>
                        <EditorContent editor={editor}/>
                    </>
                ) : <Content content={comment.content}/>}
                <Footer commentId={comment.id} author={comment.user} score={comment.score}
                        toggleReplyInputVisibility={() => setReplyInputIsVisible(prev => !prev)}
                        isEditing={isEditing}
                        onUpdate={() => {
                            if (!editor?.getText()) {
                                return
                            }
                            onEditComment(editor.getText(), comment.id)
                            setIsEditing(false)
                        }}
                        canUpdate={isEditing && (editor !== null && editor.getText().length > 0)}
                        toggleIsEditing={() => setIsEditing(prev => !prev)}
                />
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
    isEditing: boolean,
    canUpdate: boolean,
    toggleReplyInputVisibility: () => void,
    onUpdate: () => void,
    toggleIsEditing?: () => void,
    onDelete?: () => void,
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
                    toggleIsEditing
                }: FooterProps) {
    const {user, openDeleteModal} = useContext(AppContext)

    return <div className={"flex justify-between items-center"}>
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
    commentId: number,
    reply: Reply,
    onDelete?: () => void
}

function ReplyCard({commentId, reply, onDelete}: ReplyCardProps) {
    const [replyInputIsVisible, setReplyInputIsVisible] = useState(false)
    const {user, addReply, onEditReply} = useContext(AppContext)
    const [isEditing, setIsEditing] = useState(false)

    const editor = useEditor({
        extensions: [StarterKit],
        content: reply.content,
        editorProps: {
            attributes: {
                class: "border border-grayish-blue p-2 rounded-lg outline-none h-24 overflow-y-scroll my-4",
            },
        },
        immediatelyRender: false
    })

    return <div>
        <div className={"bg-white p-4 rounded-xl my-4"}>
            <Header author={reply.user}/>
            {isEditing ? (
                <>
                    <EditorContent editor={editor}/>
                </>
            ) : <Content content={reply.content}/>}
            <Footer commentId={commentId} replyId={reply.id} author={reply.user} score={reply.score}
                    toggleReplyInputVisibility={() => setReplyInputIsVisible(prev => !prev)}
                    isEditing={isEditing}
                    onDelete={onDelete}
                    onUpdate={() => {
                        if (!editor?.getText()) {
                            return
                        }
                        onEditReply(editor.getText(), commentId, reply.id)
                        setIsEditing(false)
                    }}
                    canUpdate={isEditing && (editor !== null && editor.getText().length > 0)}
                    toggleIsEditing={() => setIsEditing(prev => !prev)
                    }
            />
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