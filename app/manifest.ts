import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andie Hassani Business Coaching",
    short_name: "Andie Hassani",
    description: "Business coaching for women entrepreneurs and aspiring founders.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe7",
    theme_color: "#c51727",
    icons: [{ src: "/favicon.png", sizes: "64x64", type: "image/png" }],
  };
}
