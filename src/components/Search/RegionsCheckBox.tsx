import { FilterOptionsAtom } from "@/atoms/FilterOptionsAtom";
import { Region } from "@/utils/plant_types/filter_types";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const RegionsCheckBox = ({
    regions,
  }: {
    regions: Region[];
  }) => {
    const [selected, setSelected] = useState<string[]>();
  const [filterOptions, setFilterOptions] =useAtom(FilterOptionsAtom);
  useEffect(() => {
    
    setFilterOptions({
      ...filterOptions,
      regions: selected
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
        {regions.map((region) => (
          <Checkbox
            value={region.region_name}
            key={region.region_id}
          >
            {region.region_name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );

}

export default RegionsCheckBox;