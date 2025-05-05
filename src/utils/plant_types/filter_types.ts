

export interface FilterOptions {
    query:string,
    medicinal_uses?: string[]
    regions?: string[]
    plant_types?: string[]
}

export interface Filter {
    medicinal_uses: MedicinalUse[]
    regions: Region[]
    plant_types: PlantType[]
}

export interface MedicinalUse {
    medicinal_use: string
    plants: string[]
}

export interface Region {
    region_id: number
    region_name: string
    plants: string[]
}

export interface PlantType {
    plant_type: string
    plants: string[]
}
