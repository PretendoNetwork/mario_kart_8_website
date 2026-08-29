/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	poweredByHeader: false,
	rewrites: async () => [
		{  source: '/healthz', destination: '/api/health' }
	],
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
