import { FilterOptionsAtom } from "@/atoms/FilterOptionsAtom";
import { PlantType } from "@/utils/plant_types/filter_types";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const PlantTypesCheckBox = ({
  plant_types,
}: {
  plant_types: PlantType[];
}) => {
  const [selected, setSelected] = useState<string[]>();
  const [filterOptions, setFilterOptions] = useAtom(FilterOptionsAtom);
  useEffect(() => {

    setFilterOptions({
      ...filterOptions,
      plant_types: selected
    })

  }, [selected]);
  return (
    <div className="">

      {/* <div className="flex gap-2">

      <Input
        // isClearable
        variant="bordered"
        placeholder="Type to search..."
        onClear={() => console.log("input cleared")}
        className="max-w-xs"
        />
        <Button>
          Search
        </Button>
        </div> */}

      <CheckboxGroup
        color="primary"
        //   value={selected}
        onValueChange={setSelected}
      >
        {plant_types.map((plant_type) => (
          <Checkbox
            value={plant_type.plant_type}
            key={plant_type.plant_type}
          >
            {plant_type.plant_type}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );

}

export default PlantTypesCheckBox;