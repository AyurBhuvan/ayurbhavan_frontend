import { CurrentFeedAtom } from "@/atoms/CurrentFeedAtom";
import { FilterOptionsAtom } from "@/atoms/FilterOptionsAtom";
import { SearchButtonClickedAtom } from "@/atoms/SearchButtonClicked";
import { SearchResultAtom } from "@/atoms/SearchResult";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useAtom } from "jotai";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [feedType, setFeedType] = useAtom(CurrentFeedAtom);
  const [searchBtnClicked, setSearchBtnClicked] = useAtom(
    SearchButtonClickedAtom
  );
  const [searchResult, setSearchResult] = useAtom(SearchResultAtom);

  const router=useRouter()

  const onSearchPress = () => {
    if (localSearchTerm !== "") {
      console.log("search pressed");
      router.push(`/plants/${localSearchTerm}`)
      
      // setFeedType("search_feed");
      // setSearchBtnClicked(true);
      // Don't trigger search if the search term is empty
    }
  };

  return (
    <div className="flex gap-2 px-4 py-2">
      <Input
        className=" xl:w-[18rem]"
        placeholder="Type to search..."
        size="md"
        type="search"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchPress();
          }
        }}
      />
      <Button color="primary" onClick={onSearchPress} isIconOnly>
          <SearchIcon size={18} />
      </Button>
    </div>
  );
};

export default SearchBar;
