import React from "react";

import { useLoadingStore } from "../models/loadingStore";
import LoadingSpinner from "./LoadingSpinner";

export default {
  title: "shared/LoadingSpinner",
  component: LoadingSpinner,
};

const Template = (args: any) => {
  const { setLoading } = useLoadingStore();

  React.useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  return <LoadingSpinner />;
};

export const Default = Template.bind({});
