import { search_api_get, search_api_post } from "@/helpers/apiHelper";
import { Filter, FilterOptions } from "@/utils/plant_types/filter_types";
import { PlantCardType } from "@/utils/plant_types/plant_feed_card_type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useSearchPlants = (search_term: string) => {
    return useQuery({
        queryKey: ["search_feed", search_term],
        refetchOnWindowFocus: false,
        queryFn: () => search_api_get<{ results: PlantCardType[], filter: Filter }>(`search?query=${search_term}`),
        staleTime: Infinity,
        // enabled:false,
        retry: false,
        // refetchOnMount:false,

    })
}

export const usePaginatedSearchPlants = (search_term: string, currentPage: number, limit: number) => {
    return useQuery({
        queryKey: ["search_feed", search_term, currentPage],
        refetchOnWindowFocus: false,
        queryFn: () => search_api_get<{ results: PlantCardType[], filter: Filter,totalResults:number,totalPages:number,currentPage:number,resultsPerPage:number }>(`search?query=${search_term}&page=${currentPage}&limit=${limit}`),
        staleTime: Infinity,
        // enabled:false,
        retry: false,
        // refetchOnMount:false,
        placeholderData: keepPreviousData

    })
}  

export const usePaginatedFilterPlants = (filter_options: FilterOptions, currentPage: number, limit: number) => {
    return useQuery({
        queryKey: ["filter_feed", filter_options.query, currentPage],
        refetchOnWindowFocus: false,
        queryFn: () => search_api_post<FilterOptions>(`filter`,filter_options,limit),
        staleTime: Infinity,
        // enabled:false,
        retry: false,
        // refetchOnMount:false,
        placeholderData: keepPreviousData

    })
}  