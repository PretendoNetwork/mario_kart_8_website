/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pretendo-cdn.b-cdn.net',
				port: '',
				pathname: '/**',
			},
		],
	}
}

module.exports = nextConfig
