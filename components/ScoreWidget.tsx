import React, { useContext, useState } from "react";
import AppContext, { VoteType } from "@/context/app-context";
import Image from "next/image";

type ScoreWidgetProps = {
  score: number;
  commentId: number;
  replyId?: number;
  className?: string;
};

type VoteButtonProps = {
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
  className?: string;
};

function ScoreWidget({
  score,
  commentId,
  replyId,
  className,
}: ScoreWidgetProps) {
  const { voteMessage } = useContext(AppContext);
  const [currentVoteType, setCurrentVoteType] = useState<VoteType>();

  function vote(voteType: VoteType) {
    const newVoteType = voteType === currentVoteType ? undefined : voteType;
    voteMessage(commentId, replyId, newVoteType, currentVoteType);
    setCurrentVoteType(newVoteType);
  }

  function VoteButton({
    imageSrc,
    imageAlt,
    onClick,
    className,
  }: VoteButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex flex-col items-center justify-center p-2 ${
          className ?? ""
        }`}
      >
        <Image src={imageSrc} alt={imageAlt} height={3} width={11} />
      </button>
    );
  }

  return (
    <div
      className={`flex bg-light-gray items-center gap-4 rounded-lg py-2 px-2 ${
        className ?? ""
      }`}
    >
      <VoteButton
        imageSrc={"images/icon-plus.svg"}
        imageAlt={"upvote"}
        onClick={() => vote(VoteType.UP_VOTE)}
        className={`border border-moderate-blue rounded ${
          currentVoteType === VoteType.UP_VOTE && "bg-moderate-blue"
        }`}
      />
      <span className={"text-moderate-blue font-[500]"}>{score}</span>
      <VoteButton
        imageSrc={"images/icon-minus.svg"}
        imageAlt={"downvote"}
        onClick={() => vote(VoteType.DOWN_VOTE)}
        className={`border border-moderate-blue rounded ${
          currentVoteType === VoteType.DOWN_VOTE && "bg-moderate-blue"
        }`}
      />
    </div>
  );
}

export default ScoreWidget;
