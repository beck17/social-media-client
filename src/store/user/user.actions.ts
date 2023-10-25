import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	IPhonePassword,
	IRegisterUser,
	IUserResponse,
} from '../../types/user.interface'
import { AuthService } from '../../services/auth/auth.service'
import { removeFromStorage } from '../../services/auth/auth.helper'
import { errorCatch } from '../../api/api.helper'

export const register = createAsyncThunk<IUserResponse, IRegisterUser>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.register(data)

			return response
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	},
)

export const login = createAsyncThunk<IUserResponse, IPhonePassword>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.login(data)

			return response
		} catch (e) {
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
			const response = await AuthService.getNewTokens()

			return response
		} catch (e) {
			if (errorCatch(e) === 'jwt expired') thunkApi.dispatch(logout())

			return thunkApi.rejectWithValue(e)
		}
	},
)
