import { IInitialState } from '@/types/user.interface'
import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, register } from './user.actions'


const initialState: IInitialState = {
	// @ts-ignore
	user: null,
	isLoading: false,
	initialized: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//register
		builder
			.addCase(register.pending, (state: IInitialState) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state: IInitialState, action) => {
				state.user = action.payload.user
				state.isLoading = false
			})
			.addCase(register.rejected, (state: IInitialState) => {
				state.isLoading = false
			})

		//login
		builder.addCase(login.pending, (state: IInitialState) => {
			state.isLoading = true
		})
			.addCase(login.fulfilled, (state: IInitialState, action) => {
				state.user = action.payload.user
				state.isLoading = false
			})
			.addCase(login.rejected, (state: IInitialState) => {
				state.isLoading = false
			})

		//logout
		builder
			.addCase(logout.pending, (state: IInitialState) => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, (state: IInitialState) => {
				// @ts-ignore
				state.user = null
				state.isLoading = false
			})
			.addCase(logout.rejected, (state: IInitialState) => {
				state.isLoading = false
			})

		//checkAuth
		builder
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isLoading = false
				state.initialized = true
			})
			.addCase(checkAuth.rejected, (state) => {
				state.isLoading = false
				state.initialized = true
				// @ts-ignore
				state.user = null
			})
	},
})
