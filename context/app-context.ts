import {User} from "@/mock-data/data";
import React from "react";

type AppContextObject = {
    user?: User,
    openDeleteModal: (commentId: number, replyId: number | undefined) => void,
    upvoteMessage: (commentId: number, replyId: number | undefined) => void,
    onEditComment: (commentId: number) => void,
}

const AppContext = React.createContext<AppContextObject>({
    user: undefined,
    openDeleteModal() {
    },
    upvoteMessage() {
    },
    onEditComment() {
    }
});

export default AppContext