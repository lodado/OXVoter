export const isRtl = () => {
  const isRTL = typeof document !== "undefined" && document.dir === "rtl";

  return isRTL;
};
