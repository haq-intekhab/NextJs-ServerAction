"use client"
import { addNewUserInitialState } from "@/utils";
import { createContext, useState } from "react";


export const UserContext = createContext(null);

export default function UserState({children}) {
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
  const [addNewUserFormData, setAddNewUserFormData] = useState(
    addNewUserInitialState
  );

    return (
        <UserContext.Provider value={{currentEditedId, setCurrentEditedId,openPopup,setOpenPopup,addNewUserFormData,setAddNewUserFormData}}>{children}</UserContext.Provider>
    )
}