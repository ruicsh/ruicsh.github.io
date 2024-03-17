/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: { unoptimized: true },
	experimental: {
		serverComponentsExternalPackages: ["knex"],
	},
};

export default nextConfig;
