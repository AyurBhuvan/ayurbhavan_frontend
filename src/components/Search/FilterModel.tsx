import { Filter } from "@/utils/plant_types/filter_types";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
// import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/tabs";
import RenderTab from "./RenderTab";
// import { Input } from "@nextui-org/input";
import { ListFilter } from "lucide-react";
import { useAtom } from "jotai";
import { FilterOptionsAtom } from "@/atoms/FilterOptionsAtom";
// import { SearchTermAtom } from "@/atoms/SearchTerm";

const FilterModel = ({ options }: { options: Filter }) => {
  // const  {medicinal_uses,plant_types,regions}=options;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filter_keys = Object.keys(options);


  filter_keys.reverse();

  const [filterOptions] = useAtom(FilterOptionsAtom);

  const handleOpen = () => {
    onOpen();
  };

  const handleFilterPress = () => {
    console.log("filter pressed");

    console.log(filterOptions);

  }

  return (
    <div className="w-full flex justify-end gap-2">
      <div className="flex flex-wrap gap-3 ">
        <Button onPress={() => handleOpen()} radius="sm" color="success" className="text-white font-bold text-base" startContent={<ListFilter size={18} />}>

          Filters
        </Button>
      </div>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody>
                <div className="">


                  <Tabs>
                    {filter_keys.map((key) => (
                      <Tab key={key} title={key}>
                        <RenderTab key_name={key} options={options} />
                      </Tab>
                    ))}
                  </Tabs>
                </div>
                {/* <div className="flex">
                  
                </div> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  handleFilterPress()
                  onClose();

                }}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FilterModel;
