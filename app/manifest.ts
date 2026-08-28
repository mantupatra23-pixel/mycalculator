import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyCalculators - Smart Calculators for Everyday Life",
    short_name: "MyCalculators",
    description: "Fast, accurate browser-native calculators for Finance, Tax, Math, Health and Converters.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9f5",
    theme_color: "#1e2d3d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
