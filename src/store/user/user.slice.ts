import { IInitialState } from '../../types/user.interface'
import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, register } from './user.actions'

const initialState: IInitialState = {
	user: null,
	isLoading: false,
}

export const userSlice = createSlice<any>({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//register
		builder.addCase(register.pending, (state: IInitialState) => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state: IInitialState, action) => {
			state.user = action.payload.user
			state.isLoading = false
		})
		builder.addCase(register.rejected, (state: IInitialState) => {
			state.user = null
			state.isLoading = false
		})

		//login
		builder.addCase(login.pending, (state: IInitialState) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state: IInitialState, action) => {
			state.user = action.payload.user
			state.isLoading = false
		})
		builder.addCase(login.rejected, (state: IInitialState) => {
			state.user = null
			state.isLoading = false
		})

		//logout
		builder.addCase(logout.fulfilled, (state: IInitialState) => {
			state.user = null
			state.isLoading = false
		})

		//checkAuth

		builder.addCase(
			checkAuth.fulfilled,
			(state: IInitialState, { payload }) => {
				state.user = payload.user
			},
		)
	},
})
