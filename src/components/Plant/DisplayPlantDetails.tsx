import { useFetchAPlant } from "@/hooks/useFetchPlant";

const DisplayPlantDetails = ({id}:{id:string}) => {
    const {data:plant,isFetched,isLoading, isPending, isError}=useFetchAPlant(id);

    console.log(plant);
    
    return (
        <div className="">
        {id}
    </div>
    );
}

export default DisplayPlantDetails;