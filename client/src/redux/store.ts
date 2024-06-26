import { configureStore } from '@reduxjs/toolkit'
import generalSettingsReducer from './generalSettings/generalSettingsSlice'
import themeReducer from './theme/themeSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		theme: themeReducer,
		generalSettings: generalSettingsReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
