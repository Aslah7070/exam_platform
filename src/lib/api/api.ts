// Here we will call all hte api calls that are used in the application

// The public API URL will be set with the environment variable NEXT_PUBLIC_API_URL and the other with token will be called with axios instance

import axios from "axios";
import axiosError from "../utils/axiosError";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";


// This one is for public API calls that do not require authentication , you may use it other applications too
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})


// Public API calls
// eg
export const testPublicApi = async () => {
    try {
        const response = await api.get("/test");
        return response.data;
    } catch (error) {
        toast.error(axiosError(error));
    }
}



// Private API calls that require authentication
// eg
export const testPrivateApi = async () => {
    try {
        const response = await axiosInstance.get("/test");
        return response.data;
    } catch (error) {
        toast.error(axiosError(error));
    }
}

