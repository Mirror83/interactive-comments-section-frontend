import { User } from "@/mock-data/data";
import Image from "next/image";
import { useState } from "react";

type CommentInputProps = {
  user: User;
  addComment: (content: string) => void;
};

export default function CommentInput({ user, addComment }: CommentInputProps) {
  const [commentInput, setCommentInput] = useState("");

  function onSendComment() {
    // To replace with actual validation on the
    // input itself
    addComment(commentInput);
    setCommentInput("");
  }

  return (
    <div className={"flex flex-col gap-8 bg-white rounded-xl p-4 my-4"}>
      <textarea
        className={
          "h-24 border rounded-xl p-4 border-grayish-blue outline-none lg:hidden"
        }
        name={"comment"}
        placeholder={"Add a comment..."}
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
      />
      <div className={"flex justify-between items-center lg:items-start gap-4"}>
        <Image
          src={user.image.png}
          alt={`${user.username} profile avatar`}
          height={40}
          width={40}
        />
        <textarea
          className={
            "h-20 border rounded-xl py-2 px-4 border-grayish-blue outline-none hidden lg:block w-full"
          }
          name={"comment"}
          placeholder={"Add a comment..."}
          value={commentInput}
          onChange={(event) => {
            setCommentInput(event.target.value);
          }}
        />
        <button
          className={
            "bg-moderate-blue  text-white rounded-lg disabled:bg-grayish-blue hover:opacity-70 hover:disabled:opacity-100"
          }
          onClick={onSendComment}
          disabled={commentInput.length === 0}
        >
          <div className={"py-2 px-8"}>SEND</div>
        </button>
      </div>
    </div>
  );
}
