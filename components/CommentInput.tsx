import { CommentContext, CommentDispatchContext } from "@/context/app-context";
import Image from "next/image";
import { useContext, useState } from "react";

export default function CommentInput() {
  const [commentInput, setCommentInput] = useState("");

  const { user } = useContext(CommentContext);
  const { dispatch } = useContext(CommentDispatchContext);

  function onSendComment() {
    // To replace with actual validation on the
    // input itself
    dispatch({
      type: "add_comment",
      payload: {
        user: user!,
        content: commentInput,
      },
    });
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
          src={user!.image.png}
          alt={`${user!.username} profile avatar`}
          height={40}
          width={40}
        />
        <textarea
          className={
            "h-28 border rounded-xl py-2 px-4 focus:border-moderate-blue border-grayish-blue outline-none hidden lg:block w-full"
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
            "w-28 h-12 bg-moderate-blue text-white rounded-lg disabled:bg-grayish-blue hover:opacity-70 hover:disabled:opacity-100"
          }
          onClick={onSendComment}
          disabled={commentInput.length === 0}
        >
          <span className={"py-2 px-8"}>SEND</span>
        </button>
      </div>
    </div>
  );
}
