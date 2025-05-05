import { FilterOptionsAtom } from "@/atoms/FilterOptionsAtom";
import { MedicinalUse } from "@/utils/plant_types/filter_types";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const MedicinalUsesCheckBox = ({
  medicinal_uses,
}: {
  medicinal_uses: MedicinalUse[];
}) => {
  const [selected, setSelected] = useState<string[]>();
  const [filterOptions, setFilterOptions] = useAtom(FilterOptionsAtom);
  useEffect(() => {

    setFilterOptions({
      ...filterOptions,
      medicinal_uses: selected
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
        {medicinal_uses.map((medicinal_use) => (
          <Checkbox
            value={medicinal_use.medicinal_use}
            key={medicinal_use.medicinal_use}
          >
            {medicinal_use.medicinal_use}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default MedicinalUsesCheckBox;
