import axios from "axios";
import { config } from "process";
import { toast } from "sonner";

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// A request interceptor is not added because a couple of things that are meant to be done there are not required , like token createDynamicValidationState, and appending metadata to the request

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log(error)
        // log the error that is returned 
        // Handle token expiration, logging, etc.
        if (error.response?.status === 401) {
            // Optionally redirect to login or refresh token
            // ÷
        }
        if (error.response.data.message) {
            toast.error(error.response.data.message);

        }
        else {
            toast.error("Oops, Unexpected error")
        }
        return Promise.reject(error);
    }
);


export default axiosInstance