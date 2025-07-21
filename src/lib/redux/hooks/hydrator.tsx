"use client"

import { useEffect } from "react";
import { useAppDispatch } from "./hook";
import { rehydrate } from "../slices/authSlice";


export function AuthHydrator(){
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(rehydrate())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return null;
}

