/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		WEBSOCKET_URL: process.env.WEBSOCKET_URL,
		BASE_URL: process.env.BASE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '/uploads/**',
			},
		],
		domains: ['localhost','social-media-server-3gd5.onrender.com'],
	},
}
