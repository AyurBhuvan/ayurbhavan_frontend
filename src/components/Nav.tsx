import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { User } from "@directus/types";
import { Avatar } from "@nextui-org/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "lucide-react";

// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Nav({
  currentUser,
}: {
  currentUser: User | undefined;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const navItems = [
    {
      path: "/plants/feed",
      name: "Plants",
    },
    {
      path: "/tour/all_plants",
      name: "Virtual Tour",
    },
    {
      path: "/about",
      name: "About",
    },
  ];

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["currentUser"],
    });
  }, []);

  const { pathname } = useRouter();

  console.log(currentUser);
  
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
    }} shouldHideOnScroll position="sticky">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">AyurBhuvan</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">

        {navItems.map(({ name, path }) => (
          <NavbarItem isActive={path == pathname}>
            <Link href={path} aria-current="page">
              {name}
            </Link>
          </NavbarItem>
        ))}
        
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="flex items-center gap-6">

      <Input
            className="w-[10rem] xl:w-[18rem]"
            placeholder="Type to search..."
            size="md"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        {!currentUser ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signup"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </>
        )}
        </div>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              //   size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
