/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
			images: {
				unoptimized: true
			}
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard/home',
				permanent: true
			}
		]
	}
}

module.exports = nextConfig
