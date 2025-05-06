import { useQuery } from "@tanstack/react-query";
import { fetchEncodedUrls } from "@/services/url.service";

export const useFetchUrls = () => {
    return useQuery({
        queryKey: ["urls"],
        queryFn: fetchEncodedUrls,
    });
};
