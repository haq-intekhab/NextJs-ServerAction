"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/context";

function SingleUser({ user }) {

    const {setOpenPopup,setAddNewUserFormData,setCurrentEditedId} = useContext(UserContext);

  async function handleDeleteUser(currentUserId) {
    const result = await deleteUserAction(currentUserId, "/user-management");
    console.log(result);
  }

  async function handleEditUser(currentUser) {
    setAddNewUserFormData({
        firstName : currentUser?.firstName,
        lastName : currentUser?.lastName,
        email : currentUser?.email,
        address : currentUser?.address
    })
    setOpenPopup(true);
    setCurrentEditedId(currentUser?._id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user?.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEditUser(user)}>Edit</Button>
        <Button onClick={() => handleDeleteUser(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default SingleUser;
