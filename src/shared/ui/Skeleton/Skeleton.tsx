import React from "react";

import { cn } from "@/shared/utils";

interface ContainerSkeletonProps {
  className?: string;
}

const Skeleton: React.FC<ContainerSkeletonProps> = ({ className }) => {
  return <div className={cn("container-skeleton", "rounded", className)}></div>;
};

export default Skeleton;
