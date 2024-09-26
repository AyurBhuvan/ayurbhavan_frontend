import { useFetchFeedPlants } from "@/hooks/useFetchPlant";
import { useState } from "react";
import DisplayPlantsSkeleton from "../Skeletons/DisplayPlantsSkeleton";
import PlantCard from "./Plant_Card";
import PaginatePlants from "./PaginatePlants";

const DisplayPlantsFeed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 14;
  const {
    data: plants,
    isFetched,
    isLoading,
    isFetching,
    isSuccess,
  } = useFetchFeedPlants(currentPage, limit);
  console.log(plants);

  // const isLoading = true;
  // const isFetching = true;

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-8">
          {Array.from({ length: 15 }).map((_, index) => (
            <DisplayPlantsSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isFetched && isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 border border-red-500">
        {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          
        </div> */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full space-y-6 place-items-center">
          {plants?.data.map((plant) => {
            return <PlantCard key={plant.id} plant={plant} />;
          })}
        </div>

        <div className="">
          {plants?.data && (
            <PaginatePlants
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(plants.meta.total_count / limit)}
            />
          )}
        </div>
      </div>
    );
  }
};

export default DisplayPlantsFeed;
