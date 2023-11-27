/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	swcMinify: true,
}

module.exports = nextConfig
