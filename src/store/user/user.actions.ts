import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthService } from '@/services/auth/auth.service'
import { removeFromStorage } from '@/services/auth/auth.helper'

import { errorCatch } from '@/api/api.helper'
import { IPhonePassword, IRegisterUser, IUserResponse } from '@/types/user.interface'
import { toastAuthPromise } from '@/lib/toast-utils/toast-auth-promise'


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
			const login = AuthService.login(data)
			await toastAuthPromise(login)
			return login
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	},
)

export const logout = createAsyncThunk('auth/logout', async () => {
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
