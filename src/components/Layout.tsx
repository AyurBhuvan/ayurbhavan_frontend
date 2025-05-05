import { ReactNode } from "react";

import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  

  return (
    <>
    
      <Header/>
      <main className="max-w-5xl mx-auto ">{children}</main>
    </>
  );
};

export default Layout;
