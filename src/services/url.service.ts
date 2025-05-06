// services/url.service.ts
import axiosInstance from "@/api/axios-instance"; // adjust the path to your axios instance
import { EncodeUrlPayload, EncodeUrlResponse } from "@/interfaces/data-interface";


export const encodeUrl = async (payload: EncodeUrlPayload): Promise<EncodeUrlResponse> => {
    const response = await axiosInstance.post("/encode", payload);
    return response.data;
};