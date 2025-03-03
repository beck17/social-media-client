import Cookies from 'js-cookie'

import { getContentType } from '@/api/api.helper'
import { saveToStorage } from './auth.helper'
import { instance } from '@/api/api.interceptor'

import {
	IPhonePassword,
	IRegisterResponse,
	IRegisterUser,
	IUserResponse,
} from '@/types/user.interface'


export const AuthService = {
	async login(data: IPhonePassword) {
		const response = await instance<IUserResponse>({
			url: '/auth/login',
			method: 'POST',
			data,
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async register(data: IRegisterUser) {
		const response = await instance<IRegisterResponse>({
			url: '/auth/register',
			method: 'POST',
			data,
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		const response = await instance.post<string, { data: IUserResponse }>(
			process.env.SERVER_URL + '/auth/login/access-token',
			{ refreshToken },
			{ headers: getContentType() },
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response.data
	},
}
