// eslint-disable-next-line
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.plugins = [...config.plugins, new PrismaPlugin()]
		}

		return config
	},
}

// eslint-disable-next-line
module.exports = nextConfig
