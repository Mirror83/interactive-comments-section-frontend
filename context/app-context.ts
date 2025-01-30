import {User} from "@/mock-data/data";
import React from "react";

type AppContextObject = {
    user?: User,
    openDeleteModal: (id: number, replyId: number | undefined) => void,
    onEditComment: (id: number) => void,
}

const AppContext = React.createContext<AppContextObject>({
    user: undefined,
    openDeleteModal() {
    },
    onEditComment() {
    }
});

export default AppContext