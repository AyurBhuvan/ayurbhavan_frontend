import DisplayPlantDetails from "@/components/Plant/DisplayPlantDetails";
import { useRouter } from "next/router";

const plant = () => {
  const router = useRouter();

  const id = router.query.id;
  console.log(id?.toString());

  return <div>{id && <DisplayPlantDetails id={id?.toString()} />}</div>;
};

export default plant;
