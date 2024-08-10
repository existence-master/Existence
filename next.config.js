/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.licdn.com",
				port: "",
			},
		],
	},
};

module.exports = withPlugins([[withImages]], nextConfig);