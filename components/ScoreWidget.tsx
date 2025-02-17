import React, {useContext} from 'react';
import AppContext, {VoteType} from "@/context/app-context";
import Image from "next/image";

type ScoreWidgetProps = {
    score: number;
    commentId: number;
    replyId?: number;
}

function ScoreWidget({score, commentId, replyId}: ScoreWidgetProps) {
    const {voteMessage} = useContext(AppContext)

    return (
        <div className={"flex bg-light-gray items-center gap-4 rounded-lg py-2 px-4"}>
            <button onClick={() => voteMessage(commentId, replyId, VoteType.DOWN_VOTE)}>
                <Image src={"/images/icon-minus.svg"} alt={"down-vote"} height={3} width={11}/>
            </button>
            <span className={"text-moderate-blue font-[500]"}>{score}</span>
            <button onClick={() => voteMessage(commentId, replyId, VoteType.UP_VOTE)}>
                <Image src={"/images/icon-plus.svg"} alt={"up-vote"} height={11} width={11}/>
            </button>
        </div>
    );
}

export default ScoreWidget;