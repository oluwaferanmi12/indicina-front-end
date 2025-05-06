// hooks/useEncodeUrl.ts
import { useMutation } from "@tanstack/react-query";
import { encodeUrl} from "@/services/url.service";
import { toast } from "sonner";
import { EncodeUrlPayload, EncodeUrlResponse } from "@/interfaces/data-interface";

export const useEncodeUrl = () => {
    return useMutation<EncodeUrlResponse, Error, EncodeUrlPayload>({
        mutationFn: encodeUrl,
        onSuccess: (data) => {
            toast.success("URL successfully encoded!");
        },
        onError: (error) => {
            toast.error("Failed to encode URL. Please try again.");
            console.error(error);
        }
    });
};