import { useFetchAPlant } from "@/hooks/useFetchPlant";

const DisplayPlantDetails = ({ id }: { id: string }) => {
  const {
    data: plant,
    isFetched,
    isLoading,
    isFetching,
    isError,
  } = useFetchAPlant(id);

  console.log(plant);

  if(isLoading || isFetching) { 
    return (
      <div className="">Is Loading...........</div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="">
      {plant?.data.medicinal_uses.map((medicinal_use) => (
        <div className="" key={medicinal_use.id}>
          <p>{medicinal_use.medicinal_use}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayPlantDetails;
