import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginatePlants = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex flex-col gap-5">
      <Pagination
        showControls
        total={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
      >
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="primary"
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            onPress={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
          >
            Next
          </Button>
        </div>
      </Pagination>
    </div>
  );
};

export default PaginatePlants;
