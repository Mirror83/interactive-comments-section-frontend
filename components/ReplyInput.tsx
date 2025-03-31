import type { User } from "@/mock-data/data";
import Image from "next/image";
import { EditorContent, useEditor } from "@tiptap/react";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import History from "@tiptap/extension-history";
import { Text } from "@tiptap/extension-text";
import { Mention } from "@tiptap/extension-mention";

type ReplyInputProps = {
  isVisible: boolean;
  replyingTo: User;
  user: User;
  commentId: number;
  replyId?: number;
  addReply: (content: string, commentId: number) => void;
};

export default function ReplyInput({
  replyingTo,
  isVisible,
  user,
  commentId,
  addReply,
}: ReplyInputProps) {
  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        History,
        Text,
        Mention.configure({
          HTMLAttributes: {
            class: "text-moderate-blue",
          },
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "border border-grayish-blue p-4 rounded-lg outline-none h-24 overflow-y-scroll",
        },
      },
      immediatelyRender: false,
      content: `<span data-type='mention' data-id='${replyingTo.username}'></span>&nbsp;`,
    },
    [replyingTo]
  );

  function onSendReply() {
    console.log(editor?.getJSON());
    if (!editor?.getText()) {
      alert("Cannot send empty text.");
      return;
    }

    let content = editor.getText();
    content = content.replace(`@${replyingTo.username}`, "").trimStart();
    addReply(content, commentId);

    editor?.commands.clearContent();
    editor?.commands.setContent(
      `<span data-type='mention' data-id='${replyingTo.username}'></span>&nbsp;`
    );
  }

  return (
    <div
      className={`${
        isVisible
          ? "flex flex-col  gap-8 bg-white rounded-xl p-4 mt-4"
          : "hidden"
      }`}
    >
      <EditorContent editor={editor} />
      <div className={"flex justify-between items-center gap-4"}>
        <Image
          src={user.image.png}
          alt={`${user.username} profile avatar`}
          height={40}
          width={40}
        />
        <button
          className={
            "bg-moderate-blue  text-white rounded-lg disabled:bg-grayish-blue hover:opacity-70"
          }
          onClick={onSendReply}
          disabled={editor === null || editor.getText().length === 0}
        >
          <div className={"py-2 px-8"}>REPLY</div>
        </button>
      </div>
    </div>
  );
}
