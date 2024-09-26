import { ReactNode } from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/helpers/apiHelper";
import { User } from "@directus/types";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const ignore_routes = ["/auth/login", "/auth/signup"];

  const isIgnored = ignore_routes.includes(pathname);

  const { data: currentUser, isFetching, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () =>get<User>("users/me"),
    refetchOnWindowFocus:false
  });

  return (
    <>
    
      <nav>{!isIgnored && <Nav currentUser={currentUser}/>}</nav>
      
      <main className="max-w-5xl mx-auto px-6">{children}</main>
    </>
  );
};

export default Layout;
