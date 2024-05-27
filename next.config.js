/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withVideos = require("next-videos");

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
                hostname: "**.licdn.com",
				port: "",
			},
		],
	},
};

module.exports = withPlugins([[withImages, withVideos]], nextConfig);