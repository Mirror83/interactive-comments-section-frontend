import React, { useContext, useState } from "react";
import { CommentDispatchContext, VoteType } from "@/context/app-context";

import IconPlus from "@/app/assets/svg/icon-plus.svg";
import IconMinus from "@/app/assets/svg/icon-minus.svg";

type ScoreWidgetProps = {
  score: number;
  commentId: number;
  replyId?: number;
  className?: string;
};

type VoteButtonProps = {
  Icon: React.FC<React.SVGProps<SVGElement>>;
  type: VoteType;
  onClick: () => void;
  className?: string;
};

function ScoreWidget({
  score,
  commentId,
  replyId,
  className,
}: ScoreWidgetProps) {
  const [currentVoteType, setCurrentVoteType] = useState<VoteType>();
  const { dispatch } = useContext(CommentDispatchContext);

  function vote(voteType: VoteType) {
    const newVoteType = voteType === currentVoteType ? undefined : voteType;
    if (replyId) {
      dispatch({
        type: "vote_reply",
        payload: {
          commentId,
          replyId,
          currentVoteType,
          voteType: newVoteType,
        },
      });
    } else {
      dispatch({
        type: "vote_comment",
        payload: {
          commentId,
          currentVoteType,
          voteType: newVoteType,
        },
      });
    }
    setCurrentVoteType(newVoteType);
  }

  function VoteButton({ Icon, onClick, className }: VoteButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`group w-full flex flex-col items-center justify-center p-2 ${
          className ?? ""
        }`}
      >
        <Icon
          className="fill-light-grayish-blue group-hover:fill-moderate-blue"
          aria-hidden="true"
          focusable="false"
        />
        <span className="sr-only">{`${
          currentVoteType === VoteType.UP_VOTE ? "Upvote" : "Downvote"
        }`}</span>
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
        Icon={IconPlus}
        type={VoteType.UP_VOTE}
        onClick={() => vote(VoteType.UP_VOTE)}
      />
      <span className={"text-moderate-blue font-[500]"}>{score}</span>
      <VoteButton
        Icon={IconMinus}
        type={VoteType.DOWN_VOTE}
        onClick={() => vote(VoteType.DOWN_VOTE)}
      />
    </div>
  );
}

export default ScoreWidget;
