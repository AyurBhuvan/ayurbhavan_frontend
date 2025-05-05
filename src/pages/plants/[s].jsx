import { useRouter } from "next/router";
import SearchFeed from "@/components/Search/SearchFeed";
const search = () => {
  const router = useRouter();
  console.log(router.query.s);
  //  router.query.s;

  return (
    <div className="w-full">
      <SearchFeed search_term={router.query.s} />;
    </div>
  )
};

export default search;
