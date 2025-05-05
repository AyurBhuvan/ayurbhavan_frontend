import { atom } from "jotai";

export const CurrentFeedAtom = atom<"plants_feed" | "search_feed">("plants_feed");