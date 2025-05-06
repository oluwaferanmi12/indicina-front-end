// hooks/useEncodeUrl.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { encodeUrl} from "@/services/url.service";
import { toast } from "sonner";
import { EncodeUrlPayload, EncodeUrlResponse } from "@/interfaces/data-interface";

export const useEncodeUrl = (onSuccessCallback: ()=> void) => {
    const queryClient = useQueryClient();
    return useMutation<EncodeUrlResponse, Error, EncodeUrlPayload>({
        mutationFn: encodeUrl,
        onSuccess: (data) => {
            toast.success("URL successfully encoded!");
            queryClient.invalidateQueries({ queryKey: ["urls"] });
            onSuccessCallback();
        },
        onError: (error) => {
            console.error(error);
        }
    });
};

