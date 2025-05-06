// services/url.service.ts
import axiosInstance from "@/api/axios-instance"; // adjust the path to your axios instance
import { DecodeUrlPayload, DecodeUrlResponse, EncodeUrlPayload, EncodeUrlResponse, UrlRecord } from "@/interfaces/data-interface";


export const encodeUrl = async (payload: EncodeUrlPayload): Promise<EncodeUrlResponse> => {
    const response = await axiosInstance.post("/encode", payload);
    return response.data;
};

export const decodeUrl = async (payload: DecodeUrlPayload): Promise<DecodeUrlResponse[]> => {
    const response = await axiosInstance.post("/decode" , payload);
    return response.data;
};

export const fetchEncodedUrls = async (): Promise<UrlRecord[]> => {
    const response = await axiosInstance.get("/list");
    return response.data.data;
};