import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andie Hassani Business Coaching",
    short_name: "Andie Hassani",
    description: "Business coaching for women entrepreneurs and aspiring founders.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0e8",
    theme_color: "#c5162a",
    icons: [{ src: "/favicon.png", sizes: "64x64", type: "image/png" }],
  };
}
