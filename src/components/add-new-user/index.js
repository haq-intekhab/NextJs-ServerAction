"use client";

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewUserFormControls, addNewUserInitialState } from "@/utils";
import { addNewUserAction, editCurrentUserAction } from "@/actions";
import { UserContext } from "@/context";

function AddNewUser() {
  const {
    openPopup,
    setOpenPopup,
    addNewUserFormData,
    setAddNewUserFormData,
    currentEditedId,
    setCurrentEditedId,
  } = useContext(UserContext);

  console.log(addNewUserFormData);

  function handleSaveButtonValid() {
    return Object.keys(addNewUserFormData).every(
      (key) => addNewUserFormData[key].trim() !== ""
    );
  }

  async function handleAddNewUserAction() {
    const result = currentEditedId
      ? await editCurrentUserAction(
          currentEditedId,
          addNewUserFormData,
          "/user-management"
        )
      : await addNewUserAction(addNewUserFormData, "/user-management");
    console.log(result);
    setOpenPopup(false);
    setAddNewUserFormData(addNewUserInitialState);
    setCurrentEditedId(null);
  }

  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>Add New User</Button>
      <Dialog
        open={openPopup}
        onOpenChange={() => {
          setOpenPopup(false);
          setAddNewUserFormData(addNewUserInitialState);
          setCurrentEditedId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <form action={handleAddNewUserAction} className="grid gap-4 py-4">
            {addNewUserFormControls.map((controlItem) => (
              <div className="mb-5" key={controlItem.name}>
                <Label htmlFor={controlItem.name} className="text-right">
                  {controlItem.label}
                </Label>
                <Input
                  id={controlItem.name}
                  name={controlItem.name}
                  placeholder={controlItem.placeholder}
                  className="col-span-3"
                  type={controlItem.type}
                  value={addNewUserFormData[controlItem.name]}
                  onChange={(event) =>
                    setAddNewUserFormData({
                      ...addNewUserFormData,
                      [controlItem.name]: event.target.value,
                    })
                  }
                />
              </div>
            ))}
            <DialogFooter>
              <Button
                className="disabled:opacity-55"
                disabled={!handleSaveButtonValid()}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewUser;
