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
				hostname: 'r2-cdn.pretendo.cc',
				port: '',
				pathname: '/**',
			},
		],
	}
}

module.exports = nextConfig
