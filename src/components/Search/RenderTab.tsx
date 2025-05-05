import { Filter } from "@/utils/plant_types/filter_types";
import MedicinalUsesCheckBox from "./MedicinalUsesCheckBox";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SearchIcon } from "lucide-react";
import RegionsCheckBox from "./RegionsCheckBox";
import PlantTypesCheckBox from "./PlantTypesCheckBox";

const RenderTab = ({
  key_name,
  options,
}: {
  key_name: string;
  options: Filter;
}) => {
  
  // if(key_name=="regions"){
  //     return <div>Regions</div>
  // }

  // else if(key_name=="medicinal_uses" && options.medicinal_uses){
  //     return <MedicinalUsesCheckBox medicinal_uses={options.medicinal_uses}/>
  // }

  // else if(key_name=="plant_types"){
  //     return <div>Plant Types</div>
  // }

  return (
    <div className="h-80">
      <div className="flex gap-2 h-[15%]">
        <Input
          // isClearable
          variant="bordered"
          placeholder="Type to search..."
          onClear={() => console.log("input cleared")}
          className="max-w-xs"
        />
        <Button isIconOnly color="primary">
          <SearchIcon size={18} />
        </Button>
      </div>

      <div className="h-[85%] overflow-auto overflow-x-hidden">
        {key_name == "regions" && <div><RegionsCheckBox regions={options.regions}/></div>}
        {key_name == "medicinal_uses" && (
          <div className="h-full">
            <MedicinalUsesCheckBox medicinal_uses={options.medicinal_uses} />
          </div>
        )}
        {key_name == "plant_types" && <div>
            <PlantTypesCheckBox plant_types={options.plant_types}/>
          </div>}
      </div>
    </div>
  );
};

export default RenderTab;
