import { del, get, post } from "@/helpers/apiHelper";
import { BookmarkDetailsType, BookmarkQueryType, BookmarkResponseArrayType } from "@/utils/bookmark_types/bookmark_type";
import { User } from "@/utils/User/user_type";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { toast } from "sonner";


export const useRemoveBookmarkPlant = (plant_id: string) => {

    const query_client = useQueryClient();
    const data = {
        plant: plant_id,
        user: "$CURRENT_USER"
    }
    return useMutation({
        
        mutationFn: () => {
            return del<BookmarkQueryType>("items/bookmarks", {
                query: {
                    filter: {
                        plant: {
                            _eq: data.plant
                        },
                        user: {
                            _eq: data.user
                        }
                    }
                }
            })
        },

        onSuccess: () => {
            query_client.invalidateQueries({
                queryKey: ["bookmark_feed"]
            })
            toast.success("Bookmark removed successfully")
        },
    })
}

export const useBookmarkPlant = (plant_id: string) => {

    const data = {
        plant: plant_id,
        user: "$CURRENT_USER"
    }
    return useMutation({
        mutationFn: () => {
            return post<{plant:string,user:string}>("addBookmark", data)
        },
        onError: async (err) => {

            if (err.name == "HTTPError") {

                const httpError = err as HTTPError;

                const errJson = await httpError.response.json<any>();
                toast.error(errJson.message)

            }
            else {
                console.log(err);
                
                toast.error("Network Error");
            }

        }
    })
}

export const useFetchBookmarkPlantById = (plant_id: string,user:User | undefined) => {
    const filter = {
        plant: {
            _eq: plant_id
        },
        user: {
            _eq: "$CURRENT_USER"
        }
    }

    return useQuery({
        refetchOnWindowFocus:false,

        queryKey: [`bookmark_plant_${plant_id}` ],
        queryFn: () => {
            return get<BookmarkResponseArrayType>(`items/bookmarks?filter=${JSON.stringify(filter)}&fields=id,plant`)
        },
        enabled: !!user,
    })
}

export const useFetchBookmarkFeedPlants = (currentPage: number, limit: number) => {
    return useQuery({
        queryKey: ["bookmark_feed", currentPage],
        refetchOnWindowFocus:false,
        queryFn: () => get<{ meta: { total_count: number }; data: BookmarkDetailsType[] }>(`items/bookmarks?limit=${limit}&page=${currentPage}&meta=total_count&fields=id,plant.id, plant.botanical_name, plant.description,plant.image_urls.image_url,plant.image_urls.id`),
        placeholderData: keepPreviousData
    })
}  
