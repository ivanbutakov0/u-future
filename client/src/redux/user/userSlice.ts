import { createSlice } from '@reduxjs/toolkit'
import { userState } from '../../types/storeTypes/userSliceTypes'

const initialState: userState = {
	currentUser: null,
	error: null,
	isLoading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		},
	},
})

export const { setCurrentUser, setError, setIsLoading } = userSlice.actions

export default userSlice.reducer
