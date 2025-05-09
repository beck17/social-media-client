import Cookies from 'js-cookie'

import { ITokens, IUserResponse, IUserState } from '@/types/user.interface'


export const getAccessToken = () => {
	const accessToken = Cookies.get('accessToken')
	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
	localStorage.setItem('user', JSON.stringify({} as IUserState))
}

export const saveToStorage = (data: IUserResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
