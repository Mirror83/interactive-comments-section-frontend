import React, {useContext, useState} from 'react';
import AppContext, {VoteType} from "@/context/app-context";
import Image from "next/image";

type ScoreWidgetProps = {
    score: number;
    commentId: number;
    replyId?: number;
    className?: string;
}

function ScoreWidget({score, commentId, replyId, className}: ScoreWidgetProps) {
    const {voteMessage} = useContext(AppContext)
    const [currentVoteType, setCurrentVoteType] = useState<VoteType>()

    return (
        <div className={`flex bg-light-gray items-center gap-4 rounded-lg py-2 px-2 ${className ?? ""}`}>
            <button onClick={() => {
                setCurrentVoteType(VoteType.DOWN_VOTE)
                voteMessage(commentId, replyId, VoteType.DOWN_VOTE)
            }}
                    disabled={currentVoteType == VoteType.DOWN_VOTE}
                    className={"w-full flex flex-col items-center p-2 justify-center"}>
                <Image src={"/images/icon-minus.svg"} alt={"down-vote"} height={3} width={11}/>
            </button>
            <span className={"text-moderate-blue font-[500]"}>{score}</span>
            <button onClick={() => {
                setCurrentVoteType(VoteType.UP_VOTE)
                voteMessage(commentId, replyId, VoteType.UP_VOTE)
            }}
                    disabled={currentVoteType == VoteType.UP_VOTE}
                    className={"w-full flex flex-col items-center justify-center p-2"}>
                <Image src={"/images/icon-plus.svg"} alt={"up-vote"} height={11} width={11}/>
            </button>
        </div>
    );
}

export default ScoreWidget;