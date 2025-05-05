import { CurrentUserAtom } from "@/atoms/CurrentUserAtom";
import { get } from "@/helpers/apiHelper";
import { useLogOutUser } from "@/hooks/useAuth";
import { User } from "@/utils/User/user_type";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AvatarOptions = () => {
  const { mutate: logout } = useLogOutUser();

  const router = useRouter();
  const {
    data: currentUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => get<User>("users/me"),
    refetchOnWindowFocus: false,
    retry:1
  });

  const [user, setUser] = useAtom(CurrentUserAtom);

  // console.log(user);

  // console.log("AvatarOptions called");

  useEffect(() => {
    if (currentUser) {
      // queryClient.setQueryData(["currentUser"], currentUser);
      setUser(currentUser);
    }
  }, [currentUser]);

  if(user){
    return (
      <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
        
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.data?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Profile</DropdownItem>
        <DropdownItem
          key="configurations"
          onClick={() => {
            router.push("/bookmark/feed");
          }}
        >
          Bookmarks
        </DropdownItem>
        <DropdownItem key="help_and_feedback">Notes</DropdownItem>
        <DropdownItem key="logout" color="danger">
          <Button
            color="danger"
            onClick={() => {
              logout();
            }}
            variant="flat"
            className="w-full"
          >
            Log Out
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    );
  }
  return (
    <NavbarItem className="">
    <Button
        as={Link}
        color="primary"
        href="/auth/login"
        variant="flat"
      >
        Login
      </Button>
    </NavbarItem>
  );
};

export default AvatarOptions;
