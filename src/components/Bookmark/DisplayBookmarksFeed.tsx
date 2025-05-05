import { useFetchBookmarkFeedPlants } from "@/hooks/useBookmarkPlant";
import { useState } from "react";
import PaginatePlants from "../Plant/PaginatePlants";
import PlantCard from "../Plant/Plant_Card";
import DisplayPlantsSkeleton from "../Skeletons/DisplayPlantsSkeleton";
import RenderPlantsGrid from "../Plant/RenderPlantsGrid";

const DisplayBookmarksFeed = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 4;
  const {
    data: bookmarked_plants,
    isSuccess,
    isLoading,
    isFetching,
    isFetched,
  } = useFetchBookmarkFeedPlants(currentPage, limit);

  const [bookmarkList, setBookmarkList] = useState<typeof bookmarked_plants>();

  console.log(bookmarked_plants);

  if (isLoading || isFetching) {
    return (
      
      <RenderPlantsGrid>
        {Array.from({ length: 15 }).map((_, index) => (
            <DisplayPlantsSkeleton key={index} />
          ))}
      </RenderPlantsGrid>
    );
  }


  if (
    isFetched &&
    bookmarked_plants &&
    bookmarked_plants?.meta.total_count > 0
  ) {
    return (
      <div>
        <RenderPlantsGrid>
          {bookmarked_plants?.data.map((plant) => (
            <div key={plant.id}>
              <PlantCard plant={plant.plant} />
            </div>
          ))}
        </RenderPlantsGrid>

        <div>
          {bookmarked_plants?.data && (
            <PaginatePlants
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(bookmarked_plants.meta.total_count / limit)}
            />
          )}
        </div>
      </div>
    );
  }

  return <div className="p-8">No bookmarked plants</div>;
};

export default DisplayBookmarksFeed;
