import { PlantType } from "@/utils/plant_types/filter_types";
import { Button } from "@nextui-org/button";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";

const PlantTypesModal = ({ plant_types }: {
  plant_types: PlantType[]
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  const [scrollBehavior] =
    useState<ModalProps["scrollBehavior"]>("inside");
  const [backdrop] = useState<ModalProps["backdrop"]>("blur");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    console.log(selected);

  }, [selected])

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onPress={() => handleOpen()}>Plant Types</Button>
      </div>
      <Modal
        size={"5xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
        backdrop={backdrop}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Plant Types
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  <CheckboxGroup
                    color="primary"
                    //   value={selected}
                    onValueChange={setSelected}
                  >
                    {plant_types.map((plant_type) => (
                      <Checkbox value={plant_type.plant_type}>
                        {plant_type.plant_type}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PlantTypesModal;