"use server"

import connectToDb from "@/database"
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function addNewUserAction(formData,pathToRevalidate) {
    await connectToDb();

    try{
        const newlyCreatedUser = await User.create(formData);
        if(newlyCreatedUser) {
            revalidatePath(pathToRevalidate)
            return {
                success : true,
                message : "User added successfully"
            }
        }
        else{
            return {
                success : false,
                message : "User not added! Please try again"
            }
        }
    }
    catch(err){
        console.log(err);
        return {
            success : false,
            message : "Something Went Wront! Please try again"
        }
    }
}

export async function getAllUserAction() {
    await connectToDb();

    try{
        const fetchedUsersData = await User.find({});
        if(fetchedUsersData){
            return {
                success : true,
                data : JSON.parse(JSON.stringify(fetchedUsersData))
            }
        }
        else{
            return {
                success : false,
                message : "User data not fetched! plz try again"
            }
        }
    }
    catch(err){
        console.log(err);
        return {
            success : false,
            message : "Something went wrong! plz try again"
        }
    }
}

export async function deleteUserAction(currentUserId,pathToRevalidate) {
    await connectToDb();

    try{
        const deletedUser = await User.findByIdAndDelete(currentUserId);
        if(deletedUser){
            revalidatePath(pathToRevalidate)
            return {
                success : true,
                message : "User deleted Successfully"
            }
        }
        else{
            return {
                success : false,
                message : "User not delete! plz try again"
            }
        }
    }
    catch(err){
        console.log(err);
        return {
            success : flightRouterStateSchema,
            message : "Something went wrong! please try again"
        }
    }
}

export async function  editCurrentUserAction(currentUserId,formData,pathToRevalidate)  {
    await connectToDb();

    try{
        const {firstName,lastName,email,address} = formData;

        const updatedUser = await User.findOneAndUpdate({_id : currentUserId},{firstName,lastName,email,address},{new : true});
        if(updatedUser){
            revalidatePath(pathToRevalidate)
            return {
                success : true,
                data : updatedUser
            }
        }
        else{
            return {
                success : false,
                message : "User info is not Updated! plz try again"
            }
        }
    }
    catch(err){
        console.log(err);
        return {
            success : false,
            message : "Something Went wrong! plz try again"
        }
    }
}