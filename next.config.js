/** @type {import('next').NextConfig} */
const nextConfig = {
	cssLoaderOptions: {
		url: false,
	},
	experimental: {
		serverActions: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	swcMinify: true,
}

module.exports = nextConfig
