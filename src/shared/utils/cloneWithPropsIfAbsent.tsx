import { cloneElement, isValidElement, ReactElement } from "react";

export const cloneWithPropsIfAbsent = (element: ReactElement, extraProps: Record<string, unknown>) => {
  if (typeof element.type === "string") {
    return element; // HTML 태그이면 그대로 반환 (props 추가하지 않음)
  }

  const props: Record<string, unknown> = { ...element.props };

  Object.entries(extraProps).forEach(([key, value]) => {
    if (element.props[key] === undefined) {
      props[key] = value;
    }
  });

  if (isValidElement(element)) {
    return cloneElement(element, props);
  }

  return element;
};
