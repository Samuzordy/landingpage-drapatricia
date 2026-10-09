import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Spec section 10: photos served as AVIF/WebP (WebP where AVIF isn't supported).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
