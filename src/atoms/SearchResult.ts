import { PlantCardType } from "@/utils/plant_types/plant_feed_card_type";
import { atom } from "jotai";

export const SearchResultAtom = atom<"error" |"loading" |undefined | { results:PlantCardType[]}>(undefined); 