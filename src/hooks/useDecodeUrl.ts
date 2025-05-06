import { useMutation } from "@tanstack/react-query";
import { decodeUrl } from "@/services/url.service";
import { toast } from "sonner";
import { DecodeUrlPayload, DecodeUrlResponse } from "@/interfaces/data-interface";

export const useDecodeUrl = (onSuccessCallback?: () => void) => {
    return useMutation<DecodeUrlResponse, Error, DecodeUrlPayload>({
        //@ts-ignore
        mutationFn: decodeUrl,
        onSuccess: (data) => {
            toast.success("URL successfully decoded!");
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error) => {
            console.error(error);
        },
    });
};