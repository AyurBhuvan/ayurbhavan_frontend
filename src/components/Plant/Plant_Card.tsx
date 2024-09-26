import { PlantCardType } from "@/utils/plant_types/plant_feed_card_type";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import { BookmarkPlusIcon, LucideIcon, Share2, Share2Icon } from "lucide-react";

import { useRouter } from "next/router";

const ToolTipIcon = ({
  text,
  Icon,
  size,
}: {
  text: string;
  Icon: LucideIcon;
  size: number;
}) => {
  return (
    <Tooltip content={`${text}`} closeDelay={4}>
      <div className="cursor-pointer text-gray-700 hover:text-gray-900">
        <Icon size={size} />
      </div>
    </Tooltip>
  );
};

const PlantCard = ({ plant }: { plant: PlantCardType }) => {
  const { botanical_name, description, image_urls, common_names, id } = plant;
  console.log(botanical_name);
  const router = useRouter();

  return (
    <Card className="w-[300px] h-[350px]">

      <CardBody className="flex flex-col items-center">
        <Image
          src={image_urls[0]?.image_url}
          className="object-cover"
          width={250}
          height={200}
        />

        <div className="w-full text-center">
          <p className="text-tiny text-black line-clamp-4">
            <span className="text-base font-medium">
              {description.trim().split(/\s+/).slice(0, 2).join(" ")}
            </span>{" "}
            {description.trim().split(/\s+/).slice(2).join(" ")}
          </p>
        </div>
      </CardBody>

      <CardFooter className="justify-between">
        <div className="flex items-center space-x-2">
          <ToolTipIcon
            Icon={BookmarkPlusIcon}
            size={25}
            text="add to bookmark"
            key={"bookmark"}
          />
          <ToolTipIcon
            Icon={Share2Icon}
            size={25}
            text="Share with others"
            key={"share"}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/plant/${id}`);
          }}
        >
          <p className="text-blue-500">Find more</p>
        </div>
       
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
