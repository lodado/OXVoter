import sanitizeHtml from "sanitize-html";

export const getSanitizeHTML = (rawHtml: string): string => {
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "h4", "h5", "h6"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
    },
  });
};
