
import { ReactNode } from "react";

const RenderPlantsGrid = ({ children, xl_columns = "3" }: {
  children: ReactNode,
  xl_columns?: string
}) => {
  return (
    <div className={`grid md:grid-cols-2 xl:grid-cols-${xl_columns} w-full gap-4 place-items-center`}>
      {children}
    </div>
  );
}

export default RenderPlantsGrid;