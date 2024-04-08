import { createSlice } from '@reduxjs/toolkit'
import { generalSettingsState } from '../../types/storeTypes/generalSettingsTypes'

const initialState: generalSettingsState = {
	isSideMenuOpen: false,
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setSideMenuOpen(state, action) {
			state.isSideMenuOpen = action.payload
		},
	},
})

export const { setSideMenuOpen } = themeSlice.actions

export default themeSlice.reducer
