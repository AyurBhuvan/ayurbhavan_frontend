import { useFetchFeedPlants } from "@/hooks/useFetchPlant";
import { useState } from "react";
import DisplayPlantsSkeleton from "../Skeletons/DisplayPlantsSkeleton";
import PlantCard from "./Plant_Card";
import PaginatePlants from "./PaginatePlants";
import RenderPlantsGrid from "./RenderPlantsGrid";

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
      <RenderPlantsGrid>
        {Array.from({ length: 15 }).map((_, index) => (
          <DisplayPlantsSkeleton key={index} />
        ))}
      </RenderPlantsGrid>
    );
  }

  if (isFetched && isSuccess) {
    return (


      <div className="w-full mx-auto border border-green-500">
        {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          
        </div> */}
        <RenderPlantsGrid>
          {plants?.data.map((plant) => {
            return <PlantCard key={plant.id} plant={plant} />;
          })}
        </RenderPlantsGrid>

        <div className="w-full flex justify-end px-2 py-2">
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
