import { createSlice } from '@reduxjs/toolkit'
import { themeState } from '../../types/storeTypes/themeSliceTypes'

const initialState: themeState = {
	mode: 'light',
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleColorMode: state => {
			state.mode = state.mode === 'light' ? 'dark' : 'light'
		},
		setColorMode: (state, action) => {
			state.mode = action.payload
		},
	},
})

export const { toggleColorMode, setColorMode } = themeSlice.actions

export default themeSlice.reducer
