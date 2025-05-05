import { PlantCardType, PlantDetailsType } from "../plant_types/plant_feed_card_type"

export interface BookmarkType {
  id: string
  plant: string
}

export interface BookmarkDetailsType {
  id: string
  plant: PlantCardType
}

export interface BookmarkResponseArrayType {
  data: BookmarkType[]
}


export interface BookmarkQueryType {
  query: {
    filter: {
      user: {
        _eq: string
      }
      plant: {
        _eq: string
      }
    }
  }

}
