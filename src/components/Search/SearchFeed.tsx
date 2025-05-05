import PlantCard from "../Plant/Plant_Card";
import RenderPlantsGrid from "../Plant/RenderPlantsGrid";
import DisplayPlantsSkeleton from "../Skeletons/DisplayPlantsSkeleton";
import {
  usePaginatedSearchPlants,
  useSearchPlants,
} from "@/hooks/useSearchPlant";
import FilterModel from "./FilterModel";
import { useEffect, useState } from "react";
import PaginatePlants from "../Plant/PaginatePlants";
import { useAtom } from "jotai";
import { FilterOptionsAtom } from "@/atoms/FilterOptionsAtom";

const SearchFeed = ({ search_term }: { search_term: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchResult]=useAtom(SearchResultAtom);
  // const {
  //   data: searchResult,
  //   isLoading,
  //   isFetching,
  //   isError,
  // } = useSearchPlants(search_term);
  const [filterOptions,setFilterOptions]=useAtom(FilterOptionsAtom);

  const resultsPerPage = 6;
  const {
    data: searchResult,
    isLoading,
    isFetching,
    isError,
  } = usePaginatedSearchPlants(search_term, currentPage, resultsPerPage);

  useEffect(()=>{
    console.log(currentPage);
    
  },[currentPage])

  useEffect(()=>{
    // console.log(searchResult);
    setFilterOptions({
      query: search_term
    })
    console.log(filterOptions);
    
  },[search_term])

  console.log("component called");
  console.log(searchResult);

  // const { data, isLoading, isSuccess, isFetching, refetch } = searchResult;

  if (isLoading || isFetching) {
    return (
      <RenderPlantsGrid>
        {Array.from({ length: resultsPerPage }).map((_, index) => (
          <DisplayPlantsSkeleton key={index} />
        ))}
      </RenderPlantsGrid>
    );
  }

  if (isError) {
    // console.log(error);

    return <div>Error Occured searching</div>;
  }

  return (
    <div className="flex flex-col w-full justify-start items-start gap-2">
      <div className="px-5 py-2 w-full">
        {searchResult && <FilterModel options={searchResult?.filter} />}
      </div>

      <div className="w-full">
        <RenderPlantsGrid xl_columns="3">
          {searchResult?.results.map((plant) => {
            return <PlantCard key={plant.id} plant={plant} />;
          })}
        </RenderPlantsGrid>

        <div className="">
          {searchResult?.results && (
            <PaginatePlants
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={searchResult?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFeed;
