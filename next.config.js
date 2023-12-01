/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
}

module.exports = nextConfig
