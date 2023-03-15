/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	images: {
		domains: ['tailwindui.com', 'nevsky.storage.yandexcloud.net'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://${process.env.SERVER_URL}/api/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
