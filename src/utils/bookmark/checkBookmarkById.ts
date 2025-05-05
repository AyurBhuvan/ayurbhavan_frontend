import { get } from "@/helpers/apiHelper"
import { BookmarkResponseArrayType } from "../bookmark_types/bookmark_type";


export const checkBookmarkById=async (plant_id:string)=>{

    try {
        
        const filter={
            plant:{
                _eq:plant_id
            },
            user:{
                _eq:"$CURRENT_USER"
            }
        }

        const get_bookmark=await get<BookmarkResponseArrayType>(`items/bookmarks?filter=${JSON.stringify(filter)}`);

        console.log( get_bookmark.data.length > 0 ? get_bookmark.data[0].id : null);
        
        return get_bookmark.data.length > 0 ? get_bookmark.data[0].id : null
        // console.log();
        


    } catch (error) {
        console.log(error);
        
    }

}