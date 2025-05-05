import { useFetchAPlantCard } from "@/hooks/useFetchPlant";
import PlantCard from "../Plant/Plant_Card";

const BookmarkCard = ({ plant_id }: { plant_id: string }) => {
  const {
    data: plant,
    isFetched,

  } = useFetchAPlantCard(plant_id);

  console.log(plant?.data);



  return (
    <div className="">
      {isFetched && plant && (
        <div>
          <PlantCard plant={plant?.data} />
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
