
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = () => {
  // const [feedType] = useAtom(CurrentFeedAtom);

  const router = useRouter();
  useEffect(() => {
    // console.log("changed to ",feedType);
    
    router.replace('/plants/feed');
  }, [router]);
  // return (
  //   <div className=""></div>
  // )
}

export default index;