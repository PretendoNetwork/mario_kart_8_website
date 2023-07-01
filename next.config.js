/** @type {import('next').NextConfig} */
const nextConfig = {
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
