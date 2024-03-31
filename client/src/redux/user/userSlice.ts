import { createSlice } from '@reduxjs/toolkit'
import { userState } from '../../types/storeTypes'

const initialState: userState = {
	currentUser: null,
	error: null,
	loading: false,
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
		setLoading: (state, action) => {
			state.loading = action.payload
		},
	},
})

export const { setCurrentUser, setError, setLoading } = userSlice.actions

export default userSlice.reducer
