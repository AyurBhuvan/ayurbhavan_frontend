import { useRouter } from "next/router";
import Nav from "./Nav";

const Header = () => {
  const { pathname } = useRouter();

  const ignore_routes = ["/auth/login", "/auth/signup"];

  const isIgnored = ignore_routes.includes(pathname);

  return <nav>{!isIgnored && <Nav  />}</nav>;
};

export default Header;
