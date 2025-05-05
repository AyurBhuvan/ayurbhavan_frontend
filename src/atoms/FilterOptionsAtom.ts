import { FilterOptions } from "@/utils/plant_types/filter_types";
import { atom } from "jotai";

export const FilterOptionsAtom = atom<FilterOptions>({
  query: ""
});