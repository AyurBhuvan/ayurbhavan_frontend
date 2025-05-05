import { CurrentUserAtom } from "@/atoms/CurrentUserAtom";
import {
  useBookmarkPlant,
  useFetchBookmarkPlantById,
  useRemoveBookmarkPlant,
} from "@/hooks/useBookmarkPlant";
import { PlantCardType } from "@/utils/plant_types/plant_feed_card_type";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  BookmarkPlusIcon,
  BookmarkCheck,
  LucideIcon,
  Share2Icon,
  Loader,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "sonner";



const ToolTipIcon = ({
  text,
  Icon,
  size,
  loading = false,
}: {
  text: string;
  Icon: LucideIcon;
  size: number;
  loading?: boolean;
}) => {
  return (
    <Tooltip content={`${text}`} closeDelay={4}>
      <div className="cursor-pointer text-gray-700 hover:text-gray-900">
        {loading ? (
          <Loader size={size} className="animate-spin" />
        ) : (
          <Icon size={size} />
        )}
      </div>
    </Tooltip>
  );
};

const PlantCard = ({ plant }: { plant: PlantCardType }) => {
  const { description, image_urls, id } = plant;
  const [user] = useAtom(CurrentUserAtom);
  const router = useRouter();
  const queryClient = useQueryClient();
  console.log(plant.botanical_name, image_urls);



  // Fetch current user
  // const { data: currentUser } = useQuery({
  //   queryKey: ["currentUser"],
  //   queryFn: () => get<User>("users/me"),
  //   refetchOnWindowFocus: false,
  // });

  // Fetch bookmark status
  const { data: bookmarkedPlant, isLoading: isLoadingBookmark } =
    useFetchBookmarkPlantById(id, user);
  const isBookmarked = !!bookmarkedPlant?.data.length;

  // Bookmark mutations
  const {
    mutate: bookmarkPlant,
    isSuccess: is_bookmark_success,
    isPending: bookmark_pending,
  } = useBookmarkPlant(id);

  const {
    mutate: removeBookmark,
    isSuccess: is_bookmark_deleted,
    isPending: bookmark_deleting,
  } = useRemoveBookmarkPlant(id);

  if (is_bookmark_success || is_bookmark_deleted) {
    queryClient.invalidateQueries({ queryKey: [`bookmark_plant_${id}`] });
    queryClient.invalidateQueries({ queryKey: [`bookmark_feed`] });

  }

  const handleBookmarkClick = () => {
    if (!user) {
      toast.error("Please login to bookmark plants");
      return router.push("/auth/login");
    };
    if (isBookmarked) {
      removeBookmark();
    } else {
      bookmarkPlant();
    }

  };

  return (
    <Card className="w-full xl:w-[300px] h-[350px] xl:rounded-md" radius="none">
      <CardBody className="w-full flex flex-col items-center">
        <div className="overflow-hidden flex justify-center items-center w-full h-[220px] rounded-lg">

          <Image
            src={image_urls.length > 0 ? image_urls[0]?.image_url : "https://tse4.mm.bing.net/th/id/OIP.EXtCXQPhn4v0BtIvGhEmTAHaJ4?w=194&h=259&c=7&r=0&o=5&pid=1.7"}
            // src={image_urls[0]?.image_url}
            className="object-cover w-full h-full"
            alt={plant.botanical_name}
            width={250}
            height={250}
          />

        </div>
        <div className="w-full text-center">
          <p className="text-tiny text-black line-clamp-3">
            <span className="text-base font-medium">
              {description.trim().split(/\s+/).slice(0, 2).join(" ")}
            </span>{" "}
            {description.trim().split(/\s+/).slice(2).join(" ")}
          </p>
        </div>
      </CardBody>

      <CardFooter className="justify-between">
        <div className="flex items-center space-x-2">
          {isLoadingBookmark ? (
            <Loader2 size={25} className="animate-spin" />
          ) : (
            <div onClick={handleBookmarkClick} className="cursor-pointer">
              <ToolTipIcon
                Icon={isBookmarked ? BookmarkCheck : BookmarkPlusIcon}
                size={25}
                text={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                loading={bookmark_pending || bookmark_deleting} // Show loader when pending
              />
            </div>
          )}
          <div>
            <ToolTipIcon Icon={Share2Icon} size={25} text="Share with others" />
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/plant/${id}`)}
        >
          <p className="text-blue-500">Find more</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
