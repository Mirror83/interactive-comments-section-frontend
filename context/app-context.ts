import {User} from "@/mock-data/data";
import React from "react";

type AppContextObject = {
    user?: User,
    openDeleteModal: () => void,
    onEdit: () => void,
}

const contextDefaults = {
    user: undefined,
    openDeleteModal: () => {
    },
    onEdit: () => {
    },
}

const AppContext = React.createContext<AppContextObject>(contextDefaults);

export default AppContext