import { User } from "@/utils/User/user_type";
import { atom } from "jotai";

export const CurrentUserAtom = atom<User | undefined>(undefined); 