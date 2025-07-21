import axios from "axios";
import axiosError from "./axiosError";
import Cookies from "js-cookie";
import { toast } from "react-toastify";



const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true
})


axiosInstance.interceptors.request.use(
(config)=>{
    const token =Cookies.get('token');
    if(token){
        config.headers["Authorization"]=`Bearer ${token}`;
    }
    return config;
},
(error)=>{
    return Promise.reject(error)
}
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        Cookies.remove("token");
        toast.error("You are not authorized");
        window.location.href = "/login";
      }
      return Promise.reject(axiosError(error));
    }
  );


  export default axiosInstance