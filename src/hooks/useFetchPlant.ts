import { get } from "@/helpers/apiHelper"
import { PlantCardType, PlantDetailsType } from "@/utils/plant_types/plant_feed_card_type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const useFetchFeedPlants = (currentPage: number, limit: number) => {
    return useQuery({
        queryKey: ["feed", currentPage],
        refetchOnWindowFocus:false,
        queryFn: () => get<{ meta: { total_count: number }; data: PlantCardType[] }>(`items/plants?fields=id, botanical_name, description, image_urls.image_url,image_urls.id&limit=${limit}&page=${currentPage}&meta=total_count`),
        placeholderData: keepPreviousData
    })
}   

export const useFetchAPlant = (id: string) => {
    return useQuery({
        queryKey: ["plant", id],
        refetchOnWindowFocus:false,
        queryFn: () => get<{data:PlantDetailsType}>(`items/plants/${id}?fields=id, botanical_name, description, common_names.*, image_urls.image_url,image_urls.id, methods_for_cultivation.*,video_urls.*,medicinal_uses.medicinal_use,medicinal_uses.id,regions.regions_id.name,regions.regions_id.id,plant_type`),
    })
}

export const useFetchAPlantCard = (id: string) => {
    return useQuery({
        queryKey: ["plant", id],
        refetchOnWindowFocus:false,
        queryFn: () => get<{data:PlantCardType}>(`items/plants/${id}?fields=id, botanical_name, description, common_names.name,common_names.id, image_urls.image_url,image_urls.id`),
    })
}

