import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import AvatarOptions from "./AvatarOptions";

import SearchBar from "./Search/SearchBar";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useRouter();

  const router = useRouter();
  const navItems = [
    { path: "/plants/feed", name: "Plants" },
    { path: "/tour/all_plants", name: "Virtual Tour" },
    { path: "/about", name: "About" },
  ];

  return (
    <div className="">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
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
        }}
        shouldHideOnScroll
        position="sticky"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand
            className="cursor-pointer w-fit"
            onClick={() => {
              // setFeedType("plants_feed");
              router.push("/");
            }}
          >
            <p className="font-bold text-inherit">AyurBhuvan</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems.map(({ name, path }) => (
            <NavbarItem isActive={path === pathname} key={path}>
              <Link href={path} aria-current="page">
                {name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <div className="flex items-center gap-6">
            <div className="hidden xl:block">
              <SearchBar />
            </div>
            <AvatarOptions />
          </div>
        </NavbarContent>

        <NavbarMenu>
          {navItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              isActive={pathname === item.path}
            >
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === navItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.path}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className="xl:hidden">
        <SearchBar />
      </div>
    </div>
  );
}
