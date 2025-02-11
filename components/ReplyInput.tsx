import {User} from "@/mock-data/data";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";

type ReplyInputProps = {
    isVisible: boolean,
    replyingTo: User,
    user: User,
    commentId: number,
    replyId?: number,
    addReply: (content: string, commentId: number, replyId?: number) => void,
}

export default function ReplyInput({replyingTo, isVisible, user, commentId, replyId, addReply}: ReplyInputProps) {
    const [replyText, setReplyText] = useState("");
    const editorRef = useRef<HTMLDivElement>(null);
    const userName = replyingTo.username;
    const initialMarkup = `<div><span contenteditable="false" class='text-moderate-blue'>@${userName}&nbsp;</span></div>`

    useEffect(() => {
        const span = document.createElement("span");
        span.innerText = `@${userName} `;
        span.className = "text-moderate-blue";
        span.contentEditable = "false";
        editorRef.current?.append(span);
    }, [userName])

    function onSendReply() {
        // To replace with actual validation on the
        // input itself
        addReply(replyText, commentId, replyId);
        setReplyText("");
    }

    return <div className={`${isVisible ? "flex flex-col  gap-8 bg-white rounded-xl p-4 mt-4" : "hidden"}`}>
        <div contentEditable={"true"}
             ref={editorRef}
             className={"flex flex-row h-24 border-2 rounded-xl p-4 border-grayish-blue overflow-y-scroll overflow-x-clip"}
             onInput={e => console.log(e.currentTarget.innerHTML)}
             dangerouslySetInnerHTML={{__html: initialMarkup}}/>

        <div className={"flex justify-between items-center gap-4"}>
            <Image src={user.image.png} alt={`${user.username} profile avatar`} height={40} width={40}/>
            <button className={"bg-moderate-blue  text-white rounded-lg disabled:bg-grayish-blue"}
                    onClick={onSendReply}
                    disabled={replyText.length === 0}>
                <div className={"py-2 px-8"}>REPLY</div>
            </button>
        </div>
    </div>
}