import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: new Date().toISOString(),
    name: "Simmey",
    short_name: "Simmey",
    description: "Use a face-matching AI to see how much you resemble your mom and dad!",
    theme_color: "#2470FF",
    background_color: "#ffffff",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/?app=pwa",

    icons: [
      {
        purpose: "any",
        sizes: "75x75",
        src: "/Logo.svg",
        type: "image/svg",
      },
      {
        purpose: "maskable",
        sizes: "150x165",
        src: "/simmeyIcon.svg",
        type: "image/svg",
      },

      {
        purpose: "any",
        sizes: "512x512",
        src: "/splash_screens/icon.png",
        type: "image/png",
      },
    ],
  };
}
