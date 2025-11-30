import type { NextConfig } from "next";
import path from "path";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias["contentlayer/generated"] = path.join(
      process.cwd(),
      ".contentlayer/generated",
    );

    return config;
  },
};

export default withContentlayer(nextConfig);
