import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthService } from '@/services/auth/auth.service'
import { removeFromStorage } from '@/services/auth/auth.helper'

import { errorCatch } from '@/api/api.helper'
import { IPhonePassword, IRegisterUser, IUserResponse } from '@/types/user.interface'
import { toastError } from '@/lib/toast-utils/toast-error'


export const register = createAsyncThunk<IUserResponse, IRegisterUser>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			return await AuthService.register(data)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	},
)

export const login = createAsyncThunk<IUserResponse, IPhonePassword>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			return await AuthService.login(data)
		} catch (e) {
			toastError('Неверный номер или пароль')
			return thunkApi.rejectWithValue(e)
		}
	},
)

export const logout = createAsyncThunk<any>('auth/logout', async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IUserResponse>(
	'auth/checkAuth',
	async (_, thunkApi) => {
		try {
			return await AuthService.getNewTokens()
		} catch (e) {
			if (errorCatch(e) === 'jwt expired') thunkApi.dispatch(logout())

			return thunkApi.rejectWithValue(e)
		}
	},
)
