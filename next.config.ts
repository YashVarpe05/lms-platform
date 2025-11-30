import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "yashvarpe-lms.t3.storage.dev",
				port: "",
				protocol: "https",
			},
		],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		unoptimized: false, // or set to `true` to bypass optimization
	},
};

export default nextConfig;
