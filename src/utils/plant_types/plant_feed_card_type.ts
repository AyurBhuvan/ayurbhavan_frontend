export interface PlantsFeed {
    plants: PlantCardType[]
}


export interface PlantCardType {
    id: string
    botanical_name: string
    description: string
    image_urls: ImageUrl[]

}


export interface PlantDetailsType {
    id: string
    date_created: string
    date_updated: any
    botanical_name: string
    plant_type: string
    audio_description: any
    threed_model_url: any
    description: string
    common_names: CommonName[]
    methods_for_cultivation: MethodsForCultivation[]
    video_urls: VideoUrl[]
    medicinal_uses: MedicinalUse[]
    image_urls: ImageUrl[]
    regions: Region[]
}


interface CommonName {
    id: string

    name: string
}

export interface MethodsForCultivation {
    id: string
    method: string
}


interface ImageUrl {
    id: string

    image_url: string
}

export interface VideoUrl {
    id: string

    video_url: string
}

export interface MedicinalUse {
    id: string

    medicinal_use: string
}

export interface Region {
    id: number
    regions_id: RegionsId
    plants_id: PlantsId
}

export interface RegionsId {
    id: number

    name: string
}

export interface PlantsId {
    id: string
    date_created: string
    date_updated: any
    botanical_name: string
    plant_type: string
    audio_description: any
    threed_model_url: any
    description: string
    common_names: string[]
    methods_for_cultivation: string[]
    video_urls: string[]
    medicinal_uses: string[]
    image_urls: string[]
    regions: number[]
}