import { configureStore } from "@reduxjs/toolkit";
import  userInformation  from "../Features/userInfoSlice";

export const store = configureStore({
    reducer : {
        app : userInformation
    }
})