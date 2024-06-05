import { createSlice } from '@reduxjs/toolkit'
import { CourseResponse } from '../../types/response/CourseResponse'
import { cartSliceTypes } from '../../types/storeTypes/cartSliceTypes'

const initialState: cartSliceTypes = {
	items: [],
	isLoading: false,
	error: null,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart(state, action) {
			state.items = action.payload
		},
		addToCart(state, action) {
			const newCourse = action.payload

			const existingItem = state.items.find(
				(item: CourseResponse) => item._id === newCourse.id
			)

			if (!existingItem) {
				state.items.push(newCourse)
			}
		},
		removeFromCart(state, action) {
			const course = action.payload

			state.items = state.items.filter(
				(item: CourseResponse) => item._id !== course._id
			)
		},
		reset(state) {
			state.items = []
		},
	},
})

export const { setCart, addToCart, removeFromCart, reset } = cartSlice.actions

export default cartSlice.reducer
