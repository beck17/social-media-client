import axios from 'axios'

import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'

import { errorCatch, getContentType } from './api.helper'


export const instance = axios.create({
	baseURL: process.env.SERVER_URL,
	headers: getContentType(),
})

instance.interceptors.request.use(async (config) => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				// await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeFromStorage()
				}
			}
		}
		throw error
	},
)
