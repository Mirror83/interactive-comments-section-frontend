import {User} from "@/mock-data/data";
import React from "react";

export enum VoteType {
    UP_VOTE,
    DOWN_VOTE,
}

type AppContextObject = {
    user?: User,
    openDeleteModal: (commentId: number, replyId: number | undefined) => void,
    voteMessage: (commentId: number, replyId: number | undefined, voteType: VoteType) => void,
    onEditComment: (commentId: number) => void,
}

const AppContext = React.createContext<AppContextObject>({
    user: undefined,
    openDeleteModal() {
    },
    voteMessage() {
    },
    onEditComment() {
    }
});

export default AppContext